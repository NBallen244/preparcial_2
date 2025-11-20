/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
   type: VersioningType.URI,
   prefix: 'api/v',
   defaultVersion: '1',
 });
 const config = new DocumentBuilder()
    .setTitle('Preparcial 2 API')
    .setDescription('Endpoints para el preparcial 2 de Programación Web')
    .setVersion('1.0')
    .addTag('preparcial')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
 await app.listen(8000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
