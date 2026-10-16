import { ApiProperty, ApiPropertyOptional  } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty, MaxLength, Min, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'ปากกาลูกลื่น', description: 'ชื่อสินค้า' })
  @IsString({ message: 'name ต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณากรอกชื่อสินค้า' })
  @MaxLength(100, { message: 'ชื่อสินค้ายาวได้ไม่เกิน 100 ตัวอักษร' })
  name: string;

  @ApiProperty({ example: 12.5, description: 'ราคาต่อหน่วย' })
  @IsNumber({}, { message: 'price ต้องเป็นตัวเลข' })
  @Min(0, { message: 'ราคาต้องไม่ติดลบ' })
  price: number;

  @ApiPropertyOptional({ example: 100, description: 'จำนวนคงเหลือ' })
  @IsOptional()
  @IsInt({ message: 'stock ต้องเป็นจำนวนเต็ม' })
  @Min(0, { message: 'stock ต้องไม่ติดลบ' })
  stock?: number;
}