import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { AddProductComponent } from './components/add-product/add-product.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/category/:category', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: '**', redirectTo: 'products' }
];
