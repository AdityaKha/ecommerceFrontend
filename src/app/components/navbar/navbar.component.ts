import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ["./navbar.component.sass"]
})
export class NavbarComponent {
  private store = inject(ProductStoreService);
  private router = inject(Router);

  categories = this.store.categories;
  cartCount = this.store.cartCount;
  searchControl = new FormControl('', { nonNullable: true });
  categoryControl = new FormControl<string | null>(null);

  constructor() {
    this.searchControl.valueChanges.subscribe(v => this.store.setSearch(v ?? ''));
    this.categoryControl.valueChanges.subscribe(v => {
      this.store.setCategory(v ?? null);
      if (v) {
        this.router.navigate(['/products', 'category', v]);
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  clear() {
    this.searchControl.setValue('');
    this.categoryControl.setValue(null);
  }

  goAdd() {
    this.router.navigate(['/add-product']);
  }

  goCart() {
    this.router.navigate(['/cart']);
  }
}
