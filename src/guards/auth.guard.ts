import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private AuthService:AuthService) {}
  async canActivate(context: ExecutionContext):Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('There is no access token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
      token,{secret: process.env.JWT_SECRET_KEY});
      const user=await this.AuthService.findOne(payload.id)
      if (!user) throw new UnauthorizedException('This user does not exist')
      request['user'] = user;
    } catch {
      throw new UnauthorizedException('invalid token');
    }
    return Promise.resolve(true);
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
