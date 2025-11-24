import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ProductStoreService {
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');
  selectedCategory = signal<string | null>(null);
  cartItems = signal<Product[]>([]);

  categories = computed(() =>
    Array.from(new Set(this.products().map(p => p.category))).sort()
  );

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    return this.products().filter(p => {
      const matchesCategory = !category || p.category === category;
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });

  cartCount = computed(() => this.cartItems().length);

  constructor(private productService: ProductService) {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.productService.getAll().subscribe({
      next: (list) => {
        this.products.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  getimage(id: string) {
    return this.productService.getImage(id);
  }

  setSearch(term: string): void {
    this.searchTerm.set(term);
  }

  setCategory(cat: string | null): void {
    this.selectedCategory.set(cat);
  }

  addToCart(p: Product): void {
    this.cartItems.set([...this.cartItems(), p]);
  }

  removeFromCart(i: number): void {
    const items = [...this.cartItems()];
    items.splice(i, 1);
    this.cartItems.set(items);
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  addProduct(payload: FormData) {
    return this.productService.create(payload);
  }
  updateProduct(id: string, payload: FormData) {
    return this.productService.update(id, payload);
  }
  deleteProduct(id: string) {
    return this.productService.delete(id);
  }
}
