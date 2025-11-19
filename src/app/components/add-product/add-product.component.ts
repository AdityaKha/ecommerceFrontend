import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ["./add-product.component.sass"]
})
export class AddProductComponent {
  private fb = inject(FormBuilder);
  private store = inject(ProductStoreService);
  private snack = inject(MatSnackBar);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    price: [0, [Validators.required, Validators.min(0)]],
    product_available: [true],
    release_date: [new Date().toISOString().slice(0, 16)],
    stock_quantity: [0, [Validators.required, Validators.min(0)]]
  });
  submitting = false;

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const v = this.form.value;
    const payload = {
      brand: v.brand,
      category: v.category,
      description: v.description,
      name: v.name,
      price: Number(v.price),
      product_available: !!v.product_available,
      release_date: new Date(v.release_date as string).toISOString(),
      stock_quantity: Number(v.stock_quantity)
    };
    // this.store.addProduct(payload).subscribe({
    //   next: ()=>{ this.submitting=false; this.snack.open('Created','Close',{duration:2000}); this.router.navigate(['/products']); },
    //   error: ()=>{ this.submitting=false; this.snack.open('Failed','Close',{duration:3000}); }
    // });
  }
}
