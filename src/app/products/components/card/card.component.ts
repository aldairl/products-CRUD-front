import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.inteface'

@Component({
  selector: 'product-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input()
  public product!: Product

  ngOnInit(): void {
    if( !this.product ){
      throw Error('Product property is required!')
    }
  }

}
