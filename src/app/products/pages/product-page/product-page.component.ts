import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.inteface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit {

  public product?: Product

  constructor(
    private producstService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.producstService.getProductById(id) )
    )
    .subscribe( product => {
      if( !product ) return this.router.navigate(['/products/list'])
      this.product = product
      return
    })
  }

  goBack(){
    this.router.navigateByUrl('products/list')
  }

  deleteProduct(id:number){
    console.log('delete', id)
  }
}
