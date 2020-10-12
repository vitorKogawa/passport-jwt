import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./database/entity/User";
import * as express from 'express'
import routes from './routes'
import * as passport from 'passport'
import passport_middleware from './middlewares/passport'
import './config/env'

createConnection({
    type: 'mysql',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    entities: [
        User
    ],
    synchronize: true,
    logging: false
})
.then(response => {
    const server = express()
    const port = 3333

    server.use(express.json())
    server.use(passport.initialize())
    passport.use(passport_middleware)
    server.use(routes)

    server.listen(port, () => {
        console.log("Servidor rodando na porta: ", port)
    })
})
.catch(error => console.error(error))
