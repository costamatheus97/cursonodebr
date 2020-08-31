const { get } = require('axios')

async function getPeople(name){
  const URL = "https://swapi.dev/api/people"
  const params = `${URL}/?search=${name}&format=json`
  const result = await get(params)
  console.log('result', result.data)

  return result.data.results.map(mapPeople)
}

function mapPeople(person){
  return {
    nome: person.name,
    peso: person.height,
  }
}

module.exports = { 
  getPeople
}