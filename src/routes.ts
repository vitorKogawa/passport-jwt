import { Router } from 'express'
import * as passport from 'passport'
import UserController from './controllers/userController'

const routes = Router()

routes.post('/user', UserController.store)
routes.get('/all_users', UserController.index)
routes.post('/signin', UserController.signIn)

//rota de teste interna
routes.get('/internal_router', passport.authenticate("jwt", { session: false }) ,UserController.internal_router)

export default routes