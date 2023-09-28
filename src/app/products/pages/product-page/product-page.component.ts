import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.inteface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
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
    if(!this.product?.id) return

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.product
    })

    dialogRef.afterClosed().subscribe( response => {
      if(!response) return

      this.producstService.deleteProduct(id)
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
