import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class ProductFeatureDTO {
  @IsUUID(undefined, { message: 'ID do usuário inválido' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome da caracteristicas não pode ser vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  description: string;
}

export class ProductImageDTO {
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazio' })
  description: string;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  value: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  quantity: number;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  description: string;

  @ValidateNested()
  @IsArray()
  @Type(() => ProductFeatureDTO)
  characteristics: ProductFeatureDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  category: string;
}
