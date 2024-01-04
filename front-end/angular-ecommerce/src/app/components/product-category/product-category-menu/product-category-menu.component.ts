import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../product-category.service';
import { ProductCategory } from '../product-category.class';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css'],
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(): void {
    this.productCategoryService.getProductCategoryList().subscribe((data) => {
      console.log('Product Categories: ' + JSON.stringify(data));
      this.productCategories = data;
    });
  }
}
