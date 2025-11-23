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
import { Product } from '../../models/product.model';
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
  imagePreview: string | null = null;
  newProduct!: Product;


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

    const product = {
      // id: '',
      brand: this.form.value.brand!,
      category: this.form.value.category!,
      description: this.form.value.description!,
      name: this.form.value.name!,
      price: Number(this.form.value.price),
      productAvailable: !!this.form.value.product_available,
      releaseDate: new Date(this.form.value.release_date!).toISOString(),
      stockQuantity: Number(this.form.value.stock_quantity)
    };

    console.log('Prepared product:', product);

    // Create multipart form data
    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], {
      type: "application/json"
    }));
    console.log(formData);

    if (this.selectedFile) {
      formData.append("image", this.selectedFile);
    }


    console.log('Submitting product:', formData);

    this.store.addProduct(formData).subscribe({
      next: () => {
        this.submitting = false;
        this.snack.open('Created', 'Close', { duration: 2000 });
        this.router.navigate(['/products']);
      },
      error: () => {
        this.submitting = false;
        this.snack.open('Failed', 'Close', { duration: 3000 });
      }
    });
  }
  selectedFile: File | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(this.selectedFile);
  }

}
