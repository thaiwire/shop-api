import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // ลงทะเบียน entity ใน module นี้
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
