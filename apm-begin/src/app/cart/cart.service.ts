import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from './cart';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() =>
    this.cartItems().reduce((accQty, item) => accQty + item.quantity, 0)
  );

  subTotal = computed(() =>
    this.cartItems().reduce(
      (accTotal, item) => accTotal + item.quantity * item.product.price,
      0
    )
  );

  deliveryFee = computed<number>(() => (this.subTotal() < 50 ? 5.99 : 0));

  tax = computed(() => Math.round((this.subTotal() * 10.75) / 100));

  totalPrice = computed(() =>
    Math.round(this.subTotal() + this.deliveryFee() + this.tax())
  );

  eLength = effect(() =>
    console.log('cartarray length', this.cartItems().length)
  );

 // If the item is already in the cart, increase the quantity
 addToCart(product: Product): void {
  const index = this.cartItems().findIndex(item =>
    item.product.id === product.id);
  if (index === -1) {
    // Not already in the cart, so add with default quantity of 1
    this.cartItems.update(items => [...items, { product, quantity: 1 }]);
  } else {
    // Already in the cart, so increase the quantity by 1
    this.cartItems.update(items =>
      [
        ...items.slice(0, index),
        { ...items[index], quantity: items[index].quantity + 1 },
        ...items.slice(index + 1)
      ]);
  }
}

  updateQuantity(cartItem: CartItem, quantity: number): void {
    this.cartItems.update((items) =>
      items.map((item) =>
        item.product.id === cartItem.product.id ? { ...item, quantity } : item
      )
    );
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update((items) =>
      items.filter((item) => item.product.id !== cartItem.product.id)
    );
  }
}
