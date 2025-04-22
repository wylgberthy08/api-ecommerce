import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductEntity } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Post()
  async createNew(@Body() productData: CreateProductDTO) {
    const product = new ProductEntity();

    product.id = randomUUID();
    product.name = productData.name;
    product.userId = productData.userId;
    product.price = productData.value;
    product.quantity = productData.quantity;
    product.description = productData.description;
    product.category = productData.category;
    product.characteristics = productData.characteristics;
    product.images = productData.images;

    const registeredProduct = this.productRepository.save(product);
    return registeredProduct;
  }

  @Get()
  async listAll() {
    return this.productRepository.listAll();
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    const updatedProduct = await this.productRepository.update(
      id,
      productData,
    );

    return {
      message: 'product updated successfully',
      product: updatedProduct,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const removedProduct = await this.productRepository.remove(id);

    return {
      message: 'product removed successfully',
      product: removedProduct,
    };
  }
}