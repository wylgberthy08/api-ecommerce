import { Body, Controller, Get, Post } from '@nestjs/common';

import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Controller('produtos')
export class ProductController {
  constructor(private readonly produtoRepository: ProductRepository) {}

  @Post()
  createNew(@Body() dataProduct: CreateProductDTO) {
    const productRegistered = this.produtoRepository.create(dataProduct);
    return productRegistered;
  }

  @Get()
  listAll() {
    return this.produtoRepository.getAll();
  }
}
