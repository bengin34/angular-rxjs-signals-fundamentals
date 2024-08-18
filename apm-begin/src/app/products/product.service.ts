import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  // constructor(private http: HttpClient){} or the other way is using inject()
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(tap(() => console.log('In http.get pipeline')));
  }

  getProductById(id: number): Observable<Product> {
    const productUrl = this.productsUrl + '/' + id;
    return this.http
      .get<Product>(productUrl)
      .pipe(tap(() => console.log('In http.get by id pipeline')));
  }
}
