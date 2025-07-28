import pgPromise from "pg-promise";

const pgp = pgPromise()
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'reserve',
    user: "postgres",
    password: "admin"
})

export default db