import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from './product-category.class';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private categoryUrl = 'http://localhost:8083/api/product-category';

  constructor(private httpClient: HttpClient) {}

  //getProductCategoryList(): Observable<ProductCategory[]> {
  getProductCategoryList(): Observable<any> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((res) => res._embedded.productCategory));
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
