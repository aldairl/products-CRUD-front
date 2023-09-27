import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Product } from '../interfaces/product.inteface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class ProductsService {

    private API_URL: string = environments.API_URL

    constructor(private http: HttpClient) { }
    
    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.API_URL}/products`)
    }

    getProductById(id: string): Observable<Product|undefined>{
        return this.http.get<Product>(`${this.API_URL}/products/${id}`)
        .pipe(
            catchError( Error => of(undefined) )
        )
    }
}