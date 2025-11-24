import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {
  private store = inject(ProductStoreService);
  private router = inject(Router);

  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  
  add = (): void => this.addToCart.emit(this.product);

  isAvailable = (): boolean => this.product.productAvailable && this.product.stockQuantity > 0;

  navigate = () =>
    this.router.navigate(['/add-product'], { state: { product: this.product } });

  delete = () => {
    console.log(`Delete product with ID: ${this.product.id}`);
    this.store.deleteProduct(this.product.id!).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.store.load(); // Refresh the product list after deletion
      },
      error: (err) => {
        console.error('Failed to delete product', err);
      },
    });
  }


  constructor(private productStoreService: ProductStoreService) { }

  ngOnInit(): void {
    if (this.product.imageName) {
      this.productStoreService.getimage(this.product.id).subscribe(url => {
        this.product.imageData = url;
      });
    }
  }
}
