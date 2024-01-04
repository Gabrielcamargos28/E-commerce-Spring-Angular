import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Product.class';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  /*id: 0,
    sku: 'string,'
    name: 'string,'
    description: 'string,'
    unitPrice: number,
    imageUrl: 'string,'
    active: boolean,
    unitsInStock: number,
    dateCreated: Date,
    lastUpdated: Date
  */
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    const theProductid: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductDetail(theProductid).subscribe((data) => {
      this.product = data;
    });
  }
}
