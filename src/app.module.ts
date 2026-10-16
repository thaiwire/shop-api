import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HelloController } from './hello/hello.controller.js';
import { ProductsModule } from './products/products.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

  

  @Module({
    imports: [
      // 1) โหลดไฟล์ .env ให้ใช้ได้ทุก module
      ConfigModule.forRoot({ isGlobal: true }),

      // 2) เชื่อมฐานข้อมูล โดยอ่านค่าจาก .env
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          port: Number(config.get('DB_PORT')),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASS'),
          database: config.get<string>('DB_NAME'),
          charset: 'utf8mb4',
          autoLoadEntities: true, // โหลด entity ที่ประกาศใน forFeature ให้อัตโนมัติ
          //synchronize: true, // ⚠️ สร้าง/แก้ตารางอัตโนมัติ — ใช้ตอนพัฒนาเท่านั้น!
          synchronize: (config.get('NODE_ENV') !== 'production'),
        }),
      }),

      ProductsModule,
    ],
    controllers: [AppController, HelloController],
    providers: [AppService],
  })
  export class AppModule {};
