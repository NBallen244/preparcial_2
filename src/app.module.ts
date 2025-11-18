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

@Module({
  imports: [UserModule, RoleModule, AuthModule,
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: process.env.DB_HOST || 'localhost',
     port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
     username: process.env.DB_USERNAME || 'postgres',
     password: process.env.DB_PASS || 'password',
     database: process.env.DB_NAME || 'preparcial2',
     entities: [UserEntity, RoleEntity],
     dropSchema: true,
     synchronize: true
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
