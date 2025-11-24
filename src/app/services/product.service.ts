import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) { }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + 's')
      .pipe(map(products => products.map(p => ({ ...p, imageData: p.imageData }))))
      ;
  }

  getImage(id: string): Observable<string> {
    return this.http.get(this.api + `/${id}/image`, { responseType: 'blob' as 'json' }).pipe(
      map(blob => URL.createObjectURL(blob as Blob))
    );
  }


  create(product: FormData): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }

  update(id: string, product: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  search(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/search`, { params: { name: term } });
  }
}
