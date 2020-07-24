import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ProductDataset } from './productDataset';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Products';
  products: ProductDataset[];
  selectedProduct: ProductDataset;
  public selectedProductName: string = "";

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(res => this.products = res);
  }

  selectProduct(id: number): void {
    this.productService.getProductById(id).subscribe((res: ProductDataset) => {
      this.selectedProduct = res,
        this.selectedProductName = res.name
    });
  }

  selectProductWithInput(name): void {
  }

  check(product_id: number): boolean {
    if (!this.selectedProduct) return null;
    return (product_id == this.selectedProduct.id ? true : false);
  }

  cancel() {
    this.selectedProduct = null;
  }

  save(p_id, p_name, p_image_url, p_price: HTMLInputElement) {
    if (p_id.value != "") {
      const obj: ProductDataset = {
        name: p_name.value,
        price: +p_price.value,
        imgUrl: p_image_url.value
      }
      this.productService.update(p_id.value, obj).subscribe();
      this.ngOnInit();
      this.ngOnInit();
      this.selectedProduct = null;
    }
    if(p_id.value == ""){
      const obj1: ProductDataset = {
        name: p_name.value,
        price: +p_price.value,
        imgUrl: p_image_url.value
      }
      this.productService.add(obj1).subscribe(res => console.log(res));
      this.ngOnInit();
      this.ngOnInit();
      this.selectedProduct = null;
    }
  }

  delete(id: number): void {
    this.productService.remove(id).subscribe();
    this.ngOnInit();
    this.ngOnInit();
  }

  add() {
    this.selectedProduct = new ProductDataset();
    this.selectedProduct.id = null;
    this.selectedProduct.name = "";
    this.selectedProduct.imgUrl = "";
    this.selectedProduct.price = null ;
  }


}
