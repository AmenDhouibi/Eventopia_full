import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserRepository } from 'src/user/user.repository';
import { Jwtpayload } from './jwt-payload.interface';

@Injectable()
export  class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        @Inject(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             secretOrKey: 'topSecret51',
         });
    }

    async validate(payload :Jwtpayload){
        const { user_id } = payload;
        const user = await this.userRepository.Getuser(user_id);

        if (!user){
            console.log(!user);
            throw new UnauthorizedException();
            
        }
        return user;
    }
}