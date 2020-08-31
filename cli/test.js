const { 
  deepEqual,
  ok
} = require('assert')

const database = require('./database')

const DEFAULT_REGISTERED_ITEM = { 
  name: 'A-train',
  power: 'Speed',
  id: 1,
}

describe('Hero manipulation suit', () => {

  before(async () => {
    await database.registerHeroHandler(DEFAULT_REGISTERED_ITEM)
  })

  it('Must search a hero in file', async () => {
    const expected = DEFAULT_REGISTERED_ITEM
    const [result] = await database.readDataFromFileHandler(expected.id)

    console.log('result', result)
    console.log('expected', expected)

    deepEqual(result, expected)
  })
  
  
  it('Must create a hero using files', async () => {
    const expected = DEFAULT_REGISTERED_ITEM
    const result = await database.registerHeroHandler(DEFAULT_REGISTERED_ITEM)
    const [actual] = await database.readDataFromFileHandler(DEFAULT_REGISTERED_ITEM.id)

    console.log('result', result)
    console.log('expected', expected)

    deepEqual(actual, expected)
  })

  it('Must delete a hero by id', async () => {
    const expected = true
    const result = await database.removeHeroHandler(DEFAULT_REGISTERED_ITEM.id)

    console.log('result', result)
    console.log('expected', expected)

    deepEqual(result, expected)
  })

  it('must update hero by id', async () => {
    const expected = {
      ...DEFAULT_REGISTERED_ITEM,
      name: 'Batman',
      power: 'Rich af',
    };

    await database.updateHeroHandler(expected.id, {
      name: expected.name,
      power: expected.power,
    });

    const [realResult] = await database.readDataFromFileHandler(expected.id);

    console.log('result', realResult)
    console.log('expected', expected)

    deepEqual(realResult, expected);
  });
})