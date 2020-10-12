import { User } from '../database/entity/User'
import { getRepository } from 'typeorm'
import { Strategy, ExtractJwt ,StrategyOptions } from 'passport-jwt'
import '../config/env'

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

export default new Strategy(options, async(payload, done) =>{
    const repository = getRepository(User)
    try {
        const user = await repository.findByIds(payload.id)
        if(user)
            return done(null, user)
        
        return done(null, false)
    } catch (error){
        console.error(error)
    }
})