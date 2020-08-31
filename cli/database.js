const {
  readFile,
  writeFile
} = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database{
  constructor(){
    this.FILE_NAME = 'herois.json'
  }

  async getDataFromFileHandler(){
    const arquivo = await readFileAsync(this.FILE_NAME, 'utf8')
    return JSON.parse(arquivo.toString())
  }

  async writeFileHandler(data){
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data))

    return true
  }

  async registerHeroHandler(hero){
    const fileData = await this.getDataFromFileHandler()
    const id = hero.id <= 2 ? hero.id : Date.now()
    const completeHero = {...hero, id}
    const updatedData = [...fileData, completeHero]

    const result = await this.writeFileHandler(updatedData)

    return result
  }

  async readDataFromFileHandler(id){
    const data = await this.getDataFromFileHandler()
    const filteredData = data.filter(item => {
      return id ? item.id === id : true
    })

    return filteredData
  }

  async removeHeroHandler(id){
    if (!id) {
      await this.writeFileHandler([]);
      return true;
    }

    const data = await this.getDataFromFileHandler();

    const index = data.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw Error('hero does not exists in database');
    }
    data.splice(index, 1);

    await this.writeFileHandler(data);

    return true;
  }

  async updateHeroHandler(id, update) {
    const data = await this.getDataFromFileHandler();
    const index = data.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw Error('hero does not exists in database');
    }

    const current = data[index];
    data.splice(index, 1);

    const updatedObject = JSON.parse(JSON.stringify(update));
    const updatedData = Object.assign({}, current, updatedObject);

    return await this.writeFileHandler([...data, updatedData]);
  }
}

module.exports = new Database()