import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Product, Tag } from '../interfaces/product.inteface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class ProductsService {

    private API_URL: string = environments.API_URL

    constructor(private http: HttpClient) { }
    
    getProducts(page:number=1, limit: number=5, query:string=''): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.API_URL}/products?_page=${page}&_limit=${limit}&q=${query}`)
    }

    getProductById(id: string): Observable<Product|undefined>{
        return this.http.get<Product>(`${this.API_URL}/products/${id}`)
        .pipe(
            catchError( Error => of(undefined) )
        )
    }

    getSuggestions(query: string): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.API_URL}/products?q=${query}&_limit=5`)
    }

    addProduct(product: Product): Observable<Product>{
        return this.http.post<Product>( `${this.API_URL}/products`, product )
    }

    updateProduct(product: Product): Observable<Product>{
        if(!product.id) throw Error('product id is required')
        return this.http.patch<Product>( `${this.API_URL}/products/${product.id}`, product )
    }

    deleteProduct(id: string | number): Observable<boolean>{
        return this.http.delete( `${this.API_URL}/products/${id}` )
        .pipe(
            map( response => true ),
            catchError( err => of(false) ),
        )
    }

    getProductsTags():Observable<Tag[]>{
        return this.http.get<Tag[]>(`${this.API_URL}/tags`)
    }

}