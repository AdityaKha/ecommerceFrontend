import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) { }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + 's').pipe(
      map(products => products.map(p => ({ ...p, imageData: null })))
    );
  }

  create(product: FormData): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }
}
