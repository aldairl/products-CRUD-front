import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Product, Tag } from '../../interfaces/product.inteface';
import { ProductsService } from '../../services/product.service';
import { switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public tags:Tag[] = []

  public productForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    sku: new FormControl<string>(''),
    price: new FormControl<number>(0),
    image: new FormControl<string>(''),
    tags: new FormControl<Tag[]>([]),
    stock: new FormControl<number>(0),
  })

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ){}

  get currentProduct(): Product {
    const product = this.productForm.value as Product
    return product
  }

  ngOnInit(): void {

    this.productService.getProductsTags()
    .subscribe( tags => this.tags = tags )

    if (! this.router.url.includes('edit')){
      return
    }

    this.activatedRoute.params
    .pipe( 
      switchMap( ({ id }) => this.productService.getProductById(id) )
     ).subscribe( product => {

      if (!product) this.router.navigateByUrl('/')
      this.productForm.reset(product)

     })
  }

  onSubmit(){
    if(this.productForm.invalid) return;

    if (this.currentProduct.id){
      this.productService.updateProduct(this.currentProduct)
      .subscribe( upProduct => {
        this.showSnackbar('¡Producto actualizado exitosamente!')
      })
      return
    }

    this.productService.addProduct(this.currentProduct)
    .subscribe( newProduct => {
      this.showSnackbar('Producto creado exitosamente!')
      this.router.navigateByUrl(`/products/edit/${newProduct.id}`)
    })
  }

  onDeleteProduct(){
    if(!this.currentProduct.id) throw Error('Product id is required')
    this.showConfirmation()
  }

  showConfirmation(){
    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.productForm.value
    })

    dialogRef.afterClosed().subscribe( response => {
      if(!response) return

      this.productService.deleteProduct(this.currentProduct.id)
      .subscribe( () => {
        this.showSnackbar('Producto eliminado exitosamente!')
        return this.router.navigate(['/products'])
      })
    })
  }

  showSnackbar(message: string):void{
    this.snackbar.open(message, 'done', {
      duration: 2000
    } )
  }
}
