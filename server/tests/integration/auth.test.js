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
        await Profession.destroy({where:{ userId : 1}});
        await Role.destroy({where: {userId : 1}});
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
            const role = await Role.findOne({where: {userId : 1}});
           
            expect(role.toJSON()).toMatchObject({roleId: 2, userId: 1});
            expect(password.toJSON().value).toHaveLength(60);
            expect(profession.toJSON()).toMatchObject({ professionId: 1, experienceId: 1, userId: 1})
            expect(res.status).toBe(201);
            expect(res.headers["set-cookie"][0]).toMatch(/connect/);
            expect(created).not.toBe(null);
            expect(res.body).toMatchObject({expiresIn: 3600000 , user: created.toJSON()});
        });   
    });




    async function createUserAndPassword(){
        await User.create(user);
        const hash = await bcrypt.hash(user.password, 12);
        await Password.create({value:hash, userId: user.id,id: 1});
    }

    function loginPostExec(){
    
        return request(server)
        .post('/api/auth/login').set('Cookie', cookie).send({
            _csrf : token,
            ...data
        });  
    }

    describe('POST /auth/login and refresh', ()=>{
 
        beforeEach(async ()=>{
          await createUserAndPassword();
        });

        it('should return 401 when no user with the given email exists', async()=>{
            await User.destroy({where: {id:1}});
            const res = await loginPostExec();
            expect(res.status).toBe(401);
            expect(JSON.parse(res.text).error.message).toMatch(/Invalid email or password/);
        });

        it('should return 200 with right email and password', async ()=>{
            const res = await loginPostExec();
            const user = await User.findOne({where: {id : 1},attributes : ['firstName', 'lastName', 'email', 'image']});

            expect(user).not.toBeNull();
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({expiresIn: 3600000 , user: user.toJSON()});
            expect(res.headers["set-cookie"][0]).toMatch(/connect/);
        });

        it('should return 401 when password not correct', async ()=>{
            data.password = 'not currect';
            const res = await loginPostExec();
            expect(res.status).toBe(401);
            data.password = user.password;
        });
    });

    function extractCookieValue(string){
        let start = 0;
        let end = string.indexOf(';');
        return string.substring(start,end);
    }


    describe('GET /refresh',()=>{

        let connect;

        beforeEach(async()=>{
            await createUserAndPassword();
            const res = await loginPostExec();
            connect = extractCookieValue(res.headers['set-cookie'][0]);
        })

        const getExec = ()=>{
            return request(server).get('/api/auth/refresh').set('Cookie', [cookie,connect]).send({
                _csrf : token
            });
        }

        it('it should return 200 with nothing when no token is send', async()=>{
            connect = '';
            const res = await getExec();
            expect(res.status).toBe(200);
            expect(res.body.message).toMatch(/no token/);
        });

        it('it should return 200 with nothing when no token tempered with', async()=>{
            connect = connect.substring(0, 25);
            const res = await getExec();
            expect(res.status).toBe(500);
            expect(res.body.error.message).toMatch(/jwt malformed/);
        });

        it('it should return 200 with a user', async()=>{
            const res = await getExec();
            const created = await User.findOne({where: { id : 1 }, attributes:['email', 'firstName', 'lastName' , 'image']});
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({user: created.toJSON()});
        });


    });

    describe('GET /logut',()=>{

        it('should return 200 and clear the cookie', async()=>{
            const res = await request(server).get('/api/auth/logout').set('Cookie', cookie).send({
                _csrf: token
            });
            expect(res.status).toBe(200);
            expect(extractCookieValue(res.headers['set-cookie'][0])).toHaveLength(8);
        });

    });

});