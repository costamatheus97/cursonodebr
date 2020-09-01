const ICrud = require('./interfaces/interfaceCrud')

class Mongodb extends ICrud {
  constructor(){
    super()
  }

  create(item){
    console.log('Item registered in MongoDB')
  }
}

module.exports = Mongodb