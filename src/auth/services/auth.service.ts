import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { EncryptionService } from './encript.service';
import { UserResponse } from '../interfaces/User.response';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
 constructor(@InjectRepository(User) private  user:Repository<User>,
            private encriptService:EncryptionService,
            private  JwtService:JwtService,
            private readonly configService:ConfigService){}
  async create(createAuthDto: CreateAuthDto):Promise<UserResponse> {
    const {password,email,...rest}=createAuthDto
    const ENCRYPT_PASS=this.encriptService.encryptPassword(password)
    try {
      const newUser = this.user.create({
        ...rest,
        email:email,
        password: ENCRYPT_PASS,
      });
      try {
        const resp= await this.user.save(newUser);
        const{password,...restante}=resp
        return restante
      } catch (error) {
        if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
          throw new ConflictException('El correo capturado ya esta asociado con una cuenta.');
        } 
        else {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll():Promise<UserResponse[]> {
    const users = await this.user.find({ select: ['id', 'email', 'userName', 'CURP', 'Estado', 'fecha_nac', 'INE'] });
    return users.map(user => ({
      userName: user.userName,
      email: user.email,
      CURP: user.CURP,
      Estado: user.Estado,
      fecha_nac: user.fecha_nac,
      INE: user.INE,
    }));
  
  }

  findOne(id: number):Promise<UserResponse|HttpException> {
  const user = this.user.findOne({ select: ['id', 'email', 'userName', 'CURP', 'Estado', 'fecha_nac', 'INE'] ,where: { id } });
  if (user) {
    return user 
  }
  else{
    throw new HttpException('User not found',HttpStatus.NOT_FOUND)
  }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    const {password,...rest}=updateAuthDto
    const encript_pass=this.encriptService.encryptPassword(password)
    const newdata:UpdateAuthDto={
      password:encript_pass,
      email:rest.email,
      userName:rest.userName
    }
    return this.user.update({id},newdata)
  }

  remove(id: number) {
    return this.user.delete(id)
  }

  async signIn(LoginDto:LoginDto) {
    const {email,pass}=LoginDto
    const user = await this.user.findOne({where:{email:email}});
    if(!user){
      return `usuario con correo ${email} no esta registrado`
    }
    const access_pass=this.encriptService.decryptPassword(user?.password)
    if (access_pass !== pass) {
      throw new UnauthorizedException();
    }
    const {password,...rest}=user
    const payload = { rest };
    return {
      access_token: await this.JwtService.sign(payload,{secret:this.configService.get<string>('JWT_SECRET_KEY')}),
      messge:'Token creado exitosamente'
    };
}
verifyToken(token:string): boolean {
    if (!token) {
      throw new UnauthorizedException();
    }
  try {
    const secretKey = this.configService.get<string>('JWT_SECRET_KEY');
    const options = {
      secret: secretKey,
    };
    this.JwtService.verify(token, options);
    return true; // El token es válido
  } catch (error) {
    return false; // El token es inválido o ha expirado
  }
}

}