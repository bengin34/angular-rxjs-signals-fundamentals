import { Component, inject } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent, AsyncPipe],
})
export class ProductListComponent {
  pageTitle = 'Products';
  errorMessage = '';
  sub!: Subscription;

  private productService = inject(ProductService);

  // products: Product[] = [];
  //now make this one declarative, so declare a variable

  readonly products$ = this.productService.product$ // added here products$ instead of getProduct()
    .pipe(
      tap(() => console.log('In component pipeline')),
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  selectedProductId: number = 0;

  // after declaring approach no need to ngOnInit and destroy
  // ngOnInit(): void {

  //     .subscribe((products) => {
  //       this.products = products;
  //       console.log(this.products);
  //     });
  // .subscribe({next: products => {
  //   this.products = products;
  //   console.log(this.products);
  // },
  // error: err => this.errorMessage = err  another way is doing it in subscribe
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
