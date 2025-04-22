class ProductCharacteristicDTO {
    name: string;
    description: string;
  }
  
  class ProductImageDTO {
    url: string;
    description: string;
  }
  
  export class ListProductDTO {
    id: string;
    userId: string;
    name: string;
    value: number;
    quantity: number;
    description: string;
    category: string;
    characteristics: ProductCharacteristicDTO[];
    images: ProductImageDTO[];
  }