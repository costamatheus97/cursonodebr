const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
  constructor(){
    super()

    this._driver = null
    this._heroes = null
  }

  async isConnected(){
    try {
      await this._driver.authenticate()

      return true
    } catch(error) {
      console.log('error', error)

      return false
    }
  }

  async connect() {
    this._driver = new Sequelize(
      'heroes',
      'username', 
      'password', {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false,
      }
    ) 

    await this.defineModel()
  }

  async defineModel() {
    this._heroes = this._driver.define('heroes', {
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
  
    await this._heroes.sync()
  }

  
  async create(item) {
    const { dataValues } = await this._heroes.create(item)

    return dataValues
  }

  async read(item = {}){
    return this._heroes.findAll({ where: item, raw: true })
  }

  async update(id, item){
    const result = await this._heroes.update(item, { where: { id : id }})

    return result
  }

  async delete(id) {
    const query = id ? { id } : {}
    return await this._heroes.destroy({ where: query })
  }
}

module.exports = Postgres