import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, HttpException, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserResponse } from './interfaces/User.response';
import { LoginDto } from './dto/login.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Crear un cuenta de usuario', description: 'Pasar informacion de `dto` para creacion' })
  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }
  @ApiOperation({ summary: 'Validar si un token es aun valido', description: 'Se proporciona un token este con el fin de que si el token es invalido se hagan las acciones ya sea para renovar o eliminar' })
  @Get('validateToken')
  validateToken(@Req() req:Request) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return new HttpException('Token no proporcionado',HttpStatus.CONFLICT);
    }
    const isValid = this.authService.verifyToken(token);
    return isValid ? { message: 'Token válido' } : { message: 'Token inválido' };
  }
  @ApiOperation({ summary: 'Obtener informacion por token', description: 'Obtener la informacion de un usuario por token.' })
  @Get('info')
  getUserInfoByToken(@Query('userToken') token:string){
    return this.authService.getUserInfo(token)
  }
//User list
@ApiBearerAuth()
@UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios registrados', description: 'Para esto unicamente el `admin` solo tiene acceso por lo que ingresa con email=`admin@gmail.com` y pass=`string`' })
  findAll():Promise<UserResponse[]> {
    return this.authService.findAll();
  }
//User by id
@ApiOperation({ summary: 'Obtener informacion del usuario deacuerdo a su id' })
@ApiBearerAuth()
@UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number):Promise<UserResponse|HttpException>{
   return this.authService.findOne(id);
  }
  @ApiOperation({ summary: 'Actualizar informacion de usuario de acuerdo id', description: 'Actualizar informacion de usuario de los posibles campos `username,password,email`' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }
  @ApiOperation({ summary: 'Eliminar la cuenta de algun usuario mediante `id`', description: 'Para esto unicamente el `admin` solo tiene acceso por lo que ingresa con email=`admin@gmail.com` y pass=`string`' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  @ApiOperation({ summary: 'Inicio de sesion de usuario', description: 'Dependiendo del usuario que inicie sesion sera el token que se regresara los cuales pueden ser `admin` o `user`' })
  @Post('/login')
  login(@Body() loginDto:LoginDto){
  return this.authService.signIn(loginDto)
  }
  
}
