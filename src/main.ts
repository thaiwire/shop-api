import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ทุก URL ขึ้นต้นด้วย /api  เช่น /api/products
  app.setGlobalPrefix('api');

  // อนุญาตให้ Frontend ต่างโดเมน (เช่น Next.js port 3001) เรียกได้
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Shop API')
    .setDescription('The shop API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // เปิดหน้า Swagger UI ที่ /docs


  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server: http://localhost:${port}/api`);
  console.log(`📘 Swagger: http://localhost:${port}/docs`);
}
await bootstrap();
