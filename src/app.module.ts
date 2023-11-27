import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ReservesModule } from './reserves/reserves.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/auth.entity';
import { TrainModule } from './train/train.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tren_maya',
    entities: [__dirname+'/**/*.entity{.ts,.js}',],
    synchronize: true, // Solo para entornos de desarrollo, no usar en producción
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule, ReservesModule, 
    TrainModule, FilesModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
