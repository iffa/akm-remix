import { Product } from "../model/product.model";
import { BaseResponseDto } from "./base-response.dto";

export interface ProductsResponseDto extends BaseResponseDto {
  products: Product[];
}
