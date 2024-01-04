import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './Product.class';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8083/api/products';

  constructor(private httpClient: HttpClient) {}

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponse> {
    const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient
      .get<GetResponse>(url)
      .pipe(map((response) => response));
  }

  searchProductListPaginate(
    thePage: number,
    thePageSize: number,
    theKeyWord: string
  ): Observable<GetResponse> {
    const url = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient
      .get<GetResponse>(url)
      .pipe(map((response) => response));
  }

  searchProducts(theKeyWord: string): Observable<Product[]> {
    const searchUrl = `http://localhost:8083/api/products/search/findByNameContaining?name=${theKeyWord}`;
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProductDetail(id: number): Observable<Product> {
    const url = `http://localhost:8083/api/products/${id}`;
    return this.httpClient.get<Product>(url).pipe(map((response) => response));
  }
}

interface GetResponse {
  _embedded: { products: Product[] };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
