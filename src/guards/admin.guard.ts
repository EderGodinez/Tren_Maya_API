import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadJWT } from 'src/auth/interfaces/PayloadJWT.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext):Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No hay token de acceso administrador');
    }
    try {
      // Verificar el token
      const payload:PayloadJWT = await this.jwtService.verifyAsync(token, { secret: process.env.ADMIN_JWT_SECRET_KEY});
      // Realizar alguna lógica de autorización basada en el contenido del token
      if (payload.Role !== 'admin') {
        throw new UnauthorizedException('No tienes permisos de administrador');
      }
    } catch{
      throw new UnauthorizedException('Token de administrador inválido');
    }
    return Promise.resolve(true);
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
