await User.sync(); create a table if do not exsists
await User.sync({alter:true}); //check the table columns and types update the changes
await sequelize.sync({force:true}) create the table dropping it first

//create a user way one : preffered
const jane =await User.create({id: 12312313,
    firstName:'meme',lastName :'miriam',
    email: 'jena@gmail.com',
    password:'1234',
    city: 'Tel Aviv',
    role: 'advertizer'
});

//way 2
const jasse = User.build({id: 12312313,
        firstName:'meme',lastName :'miriam',
        email: 'jena@gmail.com',
        password:'1234',
        city: 'Tel Aviv',
        role: 'advertizer'
});

//create a user instance 
//save it
jasse.save()

let user = await User.findOne({
    where: {
        id :1
    }
});
let roles = await Role.findAll({
    where :{
        userId : user.id
    },
    include: RoleName
});        
roles.forEach(role=>console.log(role.role_name.name));
 

User.findAll({
    include: { Task }
});

SELECT * FROM users u LEFT JOIN tasks t ON
    u.id = t.userId;

--- 

User.findAll({
    include: {
        model: Taks,
        required:true
    }
});

SELECT * FROM users u INNER JOIN tasks t ON
    u.id = t.userId;


Project.findAll({
    include: {
        model: Task,
        where: {
            state : Sequelize.col('project.state')
        }
    }
})

SELECT * FROM projects p
    INNER JOIN tasks t ON p.id = t.project_id
    AND t.state = p.state;

User.findAll({
    include: {
        Tool
        Where:{
            size:{
                [Op.ne]: 'small'
            }
        }
    }
});

SELECT * FROM users u
    INNER JOIN tools t ON u.id = t.user_id 
    AND t.size != 'small'; 

maybe a faster way to execute the same query: 

//required false
User.findAll({
    where: {
        $Instrument.size$: {[Op.ne] : 'small'}
    },
    include: {
        model: Tool,
        as : 'Instruments'
    }
});

SELECT * FROM users u
    LEFT OUTER JOIN tools t ON
        u.id = t.userId 
    WHERE t.size != 'small';

ecsplictly required true (INNER JOIN)
User.findAll({
    include:[
        {
            model:Task,
            right:true
        }
    ]
});

Foo.findAll({
    include:[
        {
            model: Bar,
            required:true
        },
        {
            model: Baz,
            Where: { size: [Op.ne] : 'small'}
        },
        Baf //sorthand syntax for { model : Baf}
    ]
});

SELECT * FROM users u
    INNER JOIN bars br ON br.userId = u.id
    INNER JOIN bazs bz ON bz.userId = u.id
    JOIN Bafs bf ON bf.userId = u.id;


//Many to Many
const Foo = sequelize.define('Foo', { name: DataTypes.TEXT });
const Bar = sequelize.define('Bar', { name: DataTypes.TEXT });
Foo.belongsToMany(Bar, { through: 'Foo_Bar' });
Bar.belongsToMany(Foo, { through: 'Foo_Bar' });

await sequelize.sync();
const foo = await Foo.create({ name: 'foo' });
const bar = await Bar.create({ name: 'bar' });
await foo.addBar(bar);
const fetchedFoo = Foo.findOne({ include: Bar });
console.log(JSON.stringify(fetchedFoo, null, 2));


//returned the conjuction table record as well
{
  "id": 1,
  "name": "foo",
  "Bars": [
    {
      "id": 1,
      "name": "bar",
      "Foo_Bar": {
        "FooId": 1,
        "BarId": 1
      }
    }
  ]
}

//return only selected attributes from the conjuction table
Foo.findAll({
  include: [{
    model: Bar,
    through: {
      attributes: [/* list the wanted attributes here */]
    }
  }]
});


Foo.findOne({
  include: {
    model: Bar,
    attributes: []
  }
});


await User.create({
        firstName: 'Bob', lastName: 'alice', email: 'test@test.com',city: 'TLV'
});
const user = await User.scope({method:['getByEmail','test@test.com']}).findOne({attributes:['id', 'email']});
console.log(user.email); // this will return without the need of toJSON()

two way of creating password to the user:
const password = await Password.create({value:'sfdsfdsffs'});
await password.setUser(user); // this will work
await user.createPassword({value:'bla bla bla'}); //this will work

await user.setPassword(password); // this will not work!!!

const pswd = (await user.getPassword()).toJSON();
console.log(pswd.value);

unassociate the password and the user
await user.setPassword(null);




