import pgPromise from "pg-promise";

const pgp = pgPromise()
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'reservation',
    user: "postgres",
    password: '1234'
})

export default db