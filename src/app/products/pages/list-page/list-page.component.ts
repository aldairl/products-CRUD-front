import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.inteface';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public products: Product[] = []

  constructor( private productsService: ProductsService ){}


  ngOnInit(): void {
    this.productsService.getProducts()
    .subscribe( products => this.products = products )
  }

}
