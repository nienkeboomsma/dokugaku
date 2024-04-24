import postgres from 'postgres'

const sql = postgres({
  database: 'db',
  host: 'db',
  password: process.env.POSTGRES_PASSWORD,
  user: 'postgres',
})

export default sql
