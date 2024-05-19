/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReservesModule } from './reserves/reserves.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/auth.entity';
import { TrainModule } from './train/train.module';
import { FilesModule } from './files/files.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQLHOST,
    port: parseInt(process.env.MYSQLPORT),
    username: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQLDATABASE,
    entities: [__dirname+'/**/*.entity{.ts,.js}',],
    //synchronize: true, // Solo para entornos de desarrollo, no usar en producción
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule, ReservesModule, 
    TrainModule, FilesModule,
    ],
  controllers: [AppController],
  providers: [AppService ,ConfigService],

})
export class AppModule {
}
