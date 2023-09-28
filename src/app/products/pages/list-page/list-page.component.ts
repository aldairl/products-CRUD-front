import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.inteface';
import { ProductsService } from '../../services/product.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public products: Product[] = []
  public page: number = 1
  public limit: number = 5
  public searchInput = new FormControl('')

  constructor( private productsService: ProductsService ){}


  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    const query:string = this.searchInput.value || ''

    this.productsService.getProducts(this.page, this.limit, query)
    .subscribe( products => this.products = products )
  }

  nextPage(){
    this.page += 1
    this.getProducts()
  }

  prevPage(){
    if(this.page > 1){
      this.page -= 1
      this.getProducts()
    }
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void{
    const { option } = event
    const selectedProduct: Product = option.value

    if(!selectedProduct){
      return
    }

    this.searchInput.setValue(selectedProduct.name)
    this.getProducts()
  }

}
