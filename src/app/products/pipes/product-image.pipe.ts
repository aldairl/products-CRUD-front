import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.inteface';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(product: Product): string {
    if( !product.image ) return 'assets/images/no-product.png'
    return product.image
  }

}
