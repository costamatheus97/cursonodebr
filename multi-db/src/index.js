const ContextStrategy = require('./db/strategies/base/contextStrategy')
const Postgres = require('./db/strategies/postgres')
const Mongodb = require('./db/strategies/mongodb')

const contextPostgres = new ContextStrategy(new Postgres())
const contextMongo = new ContextStrategy(new Mongodb())

contextPostgres.create()
contextMongo.create()