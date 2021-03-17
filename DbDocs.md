User.findAll({
    include: { Task }
});

SELECT * FROM users u LEFT JOIN tasks t ON
    u.id = t.userId;


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

// maybe a faster way to execute the same query: 

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

// ecsplictly required true (INNER JOIN)
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









