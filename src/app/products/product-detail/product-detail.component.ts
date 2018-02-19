import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { IProduct } from '../product-list/product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: IProduct;
  errorMessage: string;
  pageTitle: string = 'Product Detail';

  constructor(private _route: ActivatedRoute, 
              private _productService: ProductService,
              private _router: Router) { }

  ngOnInit() {
    // get id param from route url
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      // convert to number if exists
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this._productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error
    )
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }

}
