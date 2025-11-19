import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStoreService } from '../../services/product-store.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent {
  private store = inject(ProductStoreService);

  products = this.store.filteredProducts;
  loading = this.store.loading;
  error = this.store.error;

  reload() {
    this.store.load();
  }

  addToCart(p: any) {
    this.store.addToCart(p);
  }
}
