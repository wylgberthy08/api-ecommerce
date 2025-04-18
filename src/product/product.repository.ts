import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Injectable()
export class ProductRepository {
  private products: CreateProductDTO[] = [];

  getAll() {
    return this.products;
  }
  create(product: CreateProductDTO) {
    this.products.push(product);
  }
}
