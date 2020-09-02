const assert = require('assert')
const Postgres = require ('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_CREATE_HERO = {
  name: 'Hawkeye',
  power: 'Bow n Arrow'
}
const MOCK_UPDATE_HERO = {
  name: 'Captain America',
  power: 'Useless'
}

describe('Postgres Strategy', function (){
    this.timeout(Infinity)
    this.beforeAll(async function (){
      await context.connect()
      await context.delete()
      await context.create(MOCK_UPDATE_HERO)
    })

    it('Must connect to PostgreSQL', async function (){
      const result = await context.isConnected()

      console.log('expected', { result: true })
      console.log('result', { result: result })
      
      assert.equal(result, true)
    })

    it('Must create a hero', async function (){
      const result = await context.create(MOCK_CREATE_HERO)
      delete result.id

      console.log('expected', MOCK_CREATE_HERO)
      console.log('result', result)

      assert.deepEqual(result, MOCK_CREATE_HERO)
    })

    it('Must read heroes in database', async function(){
      const [result] = await context.read({ name: MOCK_CREATE_HERO.name })
      delete result.id

      console.log('expected', MOCK_CREATE_HERO)
      console.log('result', result)

      assert.deepEqual(result, MOCK_CREATE_HERO)
    })

    it('Must update hero by id', async function(){
      const [heroToBeUpdated] = await context.read({name: MOCK_UPDATE_HERO.name})
      const newHero = {
        ...MOCK_UPDATE_HERO,
        name: 'Ant Man'
      }

      await context.update(heroToBeUpdated.id, newHero)
      const [updatedHero] = await context.read({id: heroToBeUpdated.id})

      console.log('expected', { name: newHero.name })
      console.log('result', { name: updatedHero.name })

      assert.deepEqual(updatedHero.name, newHero.name)
    })

    it('Must remove a hero from database', async function(){
      const [item] = await context.read({})
      const result = await context.delete(item.id)

      console.log('expected', { result: 1 })
      console.log('result', { result: result })

      assert.deepEqual(result, 1)
    })
})