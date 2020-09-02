// yarn add sequelize pg-hstore pg

const Sequelize = require('sequelize')
const driver = new Sequelize(
      'heroes',
      'username', 
      'password', {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false,
      }
)

async function main(){
  const Heroes = driver.define('heroes', {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      required: true
    },
    power: {
      type: Sequelize.STRING,
      required: true
    }
  }, {
    tableName: 'TB_HEROES',
    freezeTableName: false,
    timestamps: false
  })

  await Heroes.sync()
  await Heroes.create({
    name: 'Spider-man',
    power: 'Spider senses'
  })

  const result = await Heroes.findAll({ raw: true, attributes: ['name'] })
  console.log('result', result)
}

main()