const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const path = require('path');
const {multer} = require('./util/storage');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

require('./util/relations');
const ProfessionName = require('./models/profession_name');
const Role = require('./models/role');
const User = require('./models/user');
const RoleName = require('./models/role_name');
const Experience = require('./models/experience');
const Password = require('./models/password');

app.use(bodyParser.json());
app.use(cookieParser());

const csurfProtection = csurf({
    cookie: {
        httpOnly:true,
        sameSite:true,
        secure: process.env.NODE_ENV !== "development" ? true : false
    }
});

// app.use(csurfProtection);

app.get('/initv', (req,res)=>{
    res.json({csrfToken: req.csrfToken()}); 
});


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/public/uploads',express.static(path.join(__dirname, 'public/uploads')));

// app.use('/public',express.static(path.join(__dirname, '/public')));
app.use(multer);

app.use('/api/user',csurfProtection, userRoute);
app.use('/api/auth',authRoute);



app.use((error,req,res,next)=>{
    const status = error.code || 500;
    const message = error.message || 'something went wrong';
    res.status(status).json({error: {message: message , code: status}});
});


const PORT = process.env.PORT || 4200;
(async function connect(){
    try {
        await sequelize.authenticate();
        app.listen(PORT, (err)=>{
            if(err){
                console.log(err);
            } else {
                console.log('sucess_connection_server');
            }
        });


    

        // await sequelize.sync({force:true}) // create the table dropping it first
        // await ProfessionName.bulkCreate([
        //     {name: 'Carpenter'},
        //     {name: 'Electrician'},
        //     {name: 'Mechanic'},
        //     {name: 'Painter'},
        //     {name: 'Plumber'},
        //     {name: 'Tailor'},
        //     {name: 'Bricklayer'},
        //     {name: 'Window cleaner'},
        //     {name: 'Cleaner'},
        //     {name: 'other'}]
        //     );
        
        // await Experience.bulkCreate([
        //     {name: 'none'},
        //     {name: '1-2 years'},
        //     {name: '2-3 years'},
        //     {name: '3-4 years'},
        //     {name: '5 or more years'},
        // ]);

        // await RoleName.bulkCreate([
        //     {name: 'offer', roleId: 1},
        //     {name: 'bidder', roleId: 2},
        // ]);


        // await User.create({
        //     firstName: 'Bob', lastName: 'alice', email: 'test@test.com',city: 'TLV'
        // });
        // const user = await User.scope({method:['getByEmail','test@test.com']}).findOne({attributes:['id', 'email']});
        // console.log(user.email); // this will return without the need of toJSON()

        // two way of creating password to the user:
        // const password = await Password.create({value:'sfdsfdsffs'});
        // await password.setUser(user); // this will work
        // await user.createPassword({value:'bla bla bla'}); //this will work

        // await user.setPassword(password); // this will not work!!!
        
        // const pswd = (await user.getPassword()).toJSON();
        // console.log(pswd.value);

        //unassociate the password and the user
        // await user.setPassword(null);


        console.log('sucess_connection_database');
   
    } catch (error) {
        console.log(error);
    }
})();

// await User.sync(); create a table if do not exsists
// await User.sync({alter:true}); //check the table columns and types update the changes
// await sequelize.sync({force:true}) // create the table dropping it first
//create a user way one : preffered
// const jane =await User.create({id: 12312313,
//     firstName:'meme',lastName :'miriam',
//     email: 'jena@gmail.com',
//     password:'1234',
//     city: 'Tel Aviv',
//     role: 'advertizer'
// });

//way 2
// const jasse = User.build({id: 12312313,
//         firstName:'meme',lastName :'miriam',
//         email: 'jena@gmail.com',
//         password:'1234',
//         city: 'Tel Aviv',
//         role: 'advertizer'
// });
//create a user instance 
//save it
// jasse.save()




        // let user = await User.findOne({
        //     where: {
        //         id :1
        //     }
        // });
        // let roles = await Role.findAll({
        //     where :{
        //      userId : user.id
        //     },
        //     include: RoleName
        // });        roles.forEach(role=>console.log(role.role_name.name));
 