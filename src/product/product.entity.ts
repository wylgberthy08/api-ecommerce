import { ProductFeatureDTO, ProductImageDTO } from "./dto/CreateProduct.dto";

export class ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  category: string;
  characteristics: ProductFeatureDTO[];
  images: ProductImageDTO[];
} 