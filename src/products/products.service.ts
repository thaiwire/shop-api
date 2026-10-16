import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './product.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    // Inject repository for Product entity
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  // all products

  findAll(q? : string) : Promise<Product[]> {
     return this.productRepo.find({
      where: q ? { name: Like(`%${q}%`) } : {},
      order: { name: 'ASC' }
     });
  }

  // ดู 1 รายการ
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // สร้างสินค้าใหม่
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  // อัปเดตสินค้า
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepo.save(product);
  }

  // ลบสินค้า
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
  }

}