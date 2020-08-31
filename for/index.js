const axios = require('axios')
const URL = "https://swapi.dev/api/people"

async function obterPessoas(nome){
  const url = `${URL}/?search=${nome}&format=json`
  const response = await axios.get(url)
  return response.data
}

async function main(){
  console.time('time')
  const { results } = await obterPessoas('a')

  for(let result of results){
    console.log(result.name)
  }
  console.timeEnd('time')
}

main()
