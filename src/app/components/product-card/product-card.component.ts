import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  add = (): void => this.addToCart.emit(this.product);

  isAvailable = (): boolean => this.product.productAvailable && this.product.stockQuantity > 0;

  constructor(private productStoreService: ProductStoreService) { }

  ngOnInit(): void {
    if (this.product.imageName) {
      this.productStoreService.getimage(this.product.id).subscribe(url => {
        this.product.imageData = url;
      });
    }
  }
}
