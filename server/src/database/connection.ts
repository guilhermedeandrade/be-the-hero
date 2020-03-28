import knex from 'knex'
const configuration = require('../../knexfile.js')

const connection = knex(configuration.development)

export default connection
