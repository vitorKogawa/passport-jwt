import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../database/entity/User'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import '../config/env'

class UserController{
    //listagem de todos os usuários cadastrados
    async index(request: Request, response: Response){
        const repository = getRepository(User)
        const all_users = await repository.find()

        return response.json(all_users)
    }

    //cadastro de usuário
    async store(request: Request, response: Response){
        const repository = getRepository(User)
        const {
            name,
            email,
            password,
            age
        } = request.body

        //verificando se o email já existe na base de dados
        const userExists = await repository.findOne({ email })
        if(userExists)
            return response.json({ message: 'Este email já existe na base de dados.' })
        
        const newUser = repository.create(request.body)

        try {
            await repository.save(newUser)
            return response.json(newUser)
        } catch (error) {
            console.log(error)
            return response.json(error)
        }
    }

    //login do usuário
    async signIn(request: Request, response: Response){
        const repository = getRepository(User)
        const { email, password } = request.body

        //verificando se o usuário existe na base de dados
        const user = await repository.findOne({ email })
        if(!user)
            return response.json({ message: 'Este email não existe na base de dados.' })
        
        //verificando se a senha enviada no corpo de requisição corresponde a que está presente na base de dados
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword)
            return response.json({ message: 'Email ou Senha inválidos' })
        
        //gerando o token de acesso deste usuário
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

        return response.json(token)
    }

    async internal_router(request: Request, response: Response){
        console.log("Você está autenticado.")
        return response.json({ message: "Você está autenticado." })
    }
}

export default new UserController()