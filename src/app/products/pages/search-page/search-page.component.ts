import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '../../interfaces/product.inteface';
import { ProductsService } from '../../services/product.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('')
  public products: Product[] = []
  public selectedProduct?: Product

  constructor(private productService: ProductsService){}

  searchProduct(){
    const value : string = this.searchInput.value || ''

    this.productService.getSuggestions(value)
    .subscribe( products => this.products = products )
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void{
    const { option } = event
    const selectedProduct: Product = option.value

    if(!selectedProduct){
      this.selectedProduct = undefined
      return
    }

    this.selectedProduct = selectedProduct
    this.searchInput.setValue(selectedProduct.name)
    
  }

}
