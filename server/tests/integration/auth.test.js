const request = require('supertest');
const Password = require('../../models/password');
const Profession = require('../../models/profession');
const Role = require('../../models/role');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
let server;

describe('authentication and auth steps',()=>{

    const user = {
        id:1,
        email:'test@test.com',
        password: '12345l678',
        firstName:'Bob',
        lastName: 'Alice',
        city: 'Tel aviv',
        image:null,
        role:2,
        profession: 'Carpenter',
        experience: 'none'
    }
    const data = {
        email: user.email,
        password: user.password
    }
    let token; 
    let cookie;

    beforeEach(async()=>{
       server = require('../../app');
       const res = await request(server).get('/api/initv');
       cookie = res.headers["set-cookie"];
       token = res.body.csrfToken;
    });

    afterEach(async ()=>{
        server.close();
        
        await Password.destroy({ where: { userId: 1 }});
        await Profession.destroy({where:{ id : 1}});
        await Role.destroy({where: {id : 1}});
        await User.destroy({ where:{id : 1} });
    });

    describe('csrf communication', ()=>{
        it('should return csrf token with status 200',async ()=>{
            const res = await request(server).get('/api/initv');
            expect(res.status).toBe(200);
            expect(res.body.csrfToken).not.toBe(undefined);
            expect(res.headers["set-cookie"][0]).toMatch(/_csrf/);
        });

        it('should return error when no csrf token is exists',async()=>{
            const res = await request(server).post('/auth/login').send({...data});
            expect(res.status).toBe(403);
            expect(JSON.parse(res.text).error.message).toMatch(/invalid csrf token/);
        });
    });

    describe('POST /auth/signup',()=>{
        const postExec = ()=>{
            return request(server).post('/api/auth/signup').set('Cookie', cookie).send({
                _csrf: token,
                ...user
            });
        }

        it('should return 401 if the user is already exists', async ()=>{
            await User.create(user);
            const res = await postExec();
            expect(res.status).toBe(401);
            expect(JSON.parse(res.text).error.message).toMatch(/email already exists/);
        });
    

        it('should create a user', async ()=>{
            const res = await postExec();
            const created = await User.findOne({
                where: {
                    email: user.email
                },
                attributes: ['firstName', 'lastName', 'image', 'email']
            });
            
            const password = await Password.findOne({where: {userId : 1}});
            const profession = await Profession.findOne({where: {userId: 1}});
    
            expect(password.toJSON().value).toHaveLength(60);
            expect(profession.toJSON()).toMatchObject({ professionId: 1, experienceId: 1, userId: 1})
            expect(res.status).toBe(201);
            expect(res.headers["set-cookie"][0]).toMatch(/connect/);
            expect(created).not.toBe(null);
            expect(res.body).toMatchObject({expiresIn: 3600000 , user: created.toJSON()});
        });   
    });

    describe('POST /auth/login', ()=>{

        beforeEach(async ()=>{
            await User.create(user);
            const hash = await bcrypt.hash(user.password, 12);
            await Password.create({value:hash, userId: user.id,id: 1});
        });

        const postExec = () =>{
            return request(server)
            .post('/api/auth/login').set('Cookie', cookie).send({
                _csrf : token,
                ...data
            });
        }

        it('should return 401 when no user with the given email exists', async()=>{
            await User.destroy({where: {id:1}});
            const res = await postExec();
            expect(res.status).toBe(401);
            expect(JSON.parse(res.text).error.message).toMatch(/Invalid email or password/);
        });

        it('should return 200 with right email and password', async ()=>{
            const res = await postExec();

            expect(res.status).toBe(200);
            // expect(res.body).toMatchObject({expiresIn: 3600000 , user: created.toJSON()});
        });

        it('should return 401 when password not correct', async ()=>{
            data.password = 'not currect';
            const res = await postExec();
            expect(res.status).toBe(401);
        });

    


    })

})