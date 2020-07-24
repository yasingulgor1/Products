import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDataset } from './productDataset';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "http://localhost:3000/products";
  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductDataset[]> {
    return this.http.get<ProductDataset[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<ProductDataset> {
    return this.http.get<ProductDataset>(this.apiUrl + "/" + id);
  }

  add(obj: ProductDataset):Observable<ProductDataset>{
    return this.http.post<ProductDataset>(this.apiUrl , obj);
  } 

  update(id: number, obj: ProductDataset): Observable<ProductDataset> {
    return this.http.put<ProductDataset>(this.apiUrl + "/" + id, obj);
  }

  remove(id: number):Observable<any>{
    return this.http.delete(this.apiUrl + "/" + id);
  }


}
