/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { RoleEntity } from './role/role.entity';
import { SeedService } from './sql/seed/seed.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule, RoleModule, AuthModule,
   ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available throughout the application
    }),
    TypeOrmModule.forRootAsync({
          imports: [ConfigModule], // Import ConfigModule to use ConfigService
          useFactory: (configService: ConfigService) => ({
            type: 'postgres', 
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASS'),
            database: configService.get<string>('DB_NAME'),
            entities: [UserEntity, RoleEntity],
            synchronize: true,
            dropSchema: true,
            keepConnectionAlive: true,
            
          }),
          inject: [ConfigService], // Inject ConfigService
        }),
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}
  /* Ejecuta el seed SQL al iniciar el módulo, llenando la tabla de museos */
  async onModuleInit() {
    await this.seedService.runSqlSeed();
  }
}
