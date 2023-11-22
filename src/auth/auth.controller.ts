import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserResponse } from './interfaces/User.response';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
//create new user
  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }
  @Get('validateToken')
  validateToken(@Req() req:Request) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return new HttpException('Token no proporcionado',HttpStatus.CONFLICT);
    }
    const isValid = this.authService.verifyToken(token);
    return isValid ? { message: 'Token válido' } : { message: 'Token inválido' };
  }
  @Get(':userToken')
  getUserInfoByToken(@Param('userToken') token:string){
    return this.authService.getUserInfo(token)
  }
//User list
  @Get()
  findAll():Promise<UserResponse[]> {
    return this.authService.findAll();
  }
//User by id
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number):Promise<UserResponse|HttpException>{
   return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  @Post('/login')
  login(@Body() loginDto:LoginDto){
  return this.authService.signIn(loginDto)
  }
  
}
