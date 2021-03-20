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
const expressJwt = require('express-jwt');
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

const checkJwt = expressJwt({
    secret: process.env.TOKEN_SECRET,
    getToken: req=> req.cookies.connect,
    algorithms:['HS256']
});

app.use(csurfProtection);

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

app.use('/api/user', checkJwt, userRoute);
app.use('/api/auth',authRoute);


app.use((error,req,res,next)=>{

    console.log('error',error);
    const status = error.status ? error.status : error.code ? error.code  : 500;
    const message = error.message ? error.message : error.inner ? error.inner.message : 'something went wrong';
    let reqError = {
        error: {
            message: message
        }
    }
    if(error.invalidInputs && error.invalidInputs.length > 0){
        reqError.error.invalidInputs = error.invalidInputs
    }

    res.status(status).json(reqError);
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



        console.log('sucess_connection_database');
   
    } catch (error) {
        console.log(error);
    }
})();

