import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { EncryptionService } from './services/encript.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '2h' },
  }),],
  controllers: [AuthController],
  providers: [AuthService,EncryptionService],
})
export class AuthModule {
}
