import { Module } from '@nestjs/common';
import { UserController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { MailingModule } from 'src/mailing/mailing.module';



@Module({
  imports: [
    MailingModule,
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
    secret : 'topSecret51',
    signOptions :{
      expiresIn :3600,
    }
  })],
  providers: [
    AuthService,
    AuthRepository,
    JwtStrategy,
  ],
  controllers: [UserController],
  exports: [AuthService, AuthRepository,JwtStrategy,PassportModule],
})
export class AuthModule {}
