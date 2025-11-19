import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStoreService } from '../../services/product-store.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ["./cart.component.sass"]
})
export class CartComponent {
  private store = inject(ProductStoreService);
  items = this.store.cartItems;
  
  get total() {
    return this.items().reduce((s, a) => s + a.price, 0);
  }
  
  remove(i: number) {
    this.store.removeFromCart(i);
  }
  
  clear() {
    this.store.clearCart();
  }
}
