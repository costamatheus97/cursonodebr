const Commander = require('commander')
const Database = require('./database')
const database = require('./database')
const Hero = require('./hero')

async function main(){
  Commander.version('v1')
  .option('-n, --codename [value]', "Hero name")
  .option('-p, --power [value]', "Hero power")
  .option('-i, --id [value]', "Hero id")
  .option('-r, --register', "Register a hero")
  .option('-s, --show', "Show current heroes")
  .option('-rm, --remove [value]', "Remove hero by id")
  .parse(process.argv)

  const hero = new Hero(Commander)

  async function registerHero(){
    const result = await database.registerHeroHandler(hero)
      
    if(!result){
      console.error('Hero was not registered in database')

      return
    }

    console.log('Hero successfully created in database')
  }

  async function getHeroes(){
    const result = await database.readDataFromFileHandler()

      if(!result){
        console.error('Error')

        return
      }

      console.log(result)
  }

  async function removeHeroById(id){
    const result = await database.removeHeroHandler(id)

    if(!result){
      console.error('Error')

      return
    }
    
    console.log('Hero successfully removed')
  }

  try{
    if(Commander.register){
      registerHero()
    }

    if(Commander.show){
      getHeroes()
    }

    if(Commander.remove){
      removeHeroById(hero.id)
    }

  } catch (error){
    console.log('Error: ', error)
  }
}

main()