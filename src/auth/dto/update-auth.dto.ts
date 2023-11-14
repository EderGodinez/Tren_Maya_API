import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto {
        userName?:string
        password?:string
        email?:string    
}
