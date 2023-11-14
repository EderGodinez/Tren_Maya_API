import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req } from '@nestjs/common';
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
//User list
  @Get()
  findAll():Promise<UserResponse[]> {
    return this.authService.findAll();
  }
//User by id
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number):Promise<UserResponse>|string{
   const resp=this.authService.findOne(id);
   if (resp) return resp
   else{
    return ''
   }
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
  @Get('validate-token')
  validateToken(@Req() req:Request): string {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return 'Token no proporcionado';
    }
    const isValid = this.authService.verifyToken(token);
    return isValid ? 'Token válido' : 'Token inválido';
  }
}
