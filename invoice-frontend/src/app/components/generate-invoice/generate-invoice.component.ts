import {Component} from '@angular/core';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css']
})
export class GenerateInvoiceComponent {
  oneProduct: IProducts = {
    desc: "",
    qty: 1,
    cost: 1,
    total: 0
  };
  private mGstPercentage: number = 12;
  private mProducts: IProducts[] = [];
  constructor() {
  }
  get products(): IProducts[] {
    return this.mProducts;
  }
  get gstPercentage() {
    return this.mGstPercentage;
  }
  gstOnSubTotal(): number {
    const subTotal: number = this.subTotal();
    return (subTotal * this.gstPercentage) / 100;
  }

  grandTotal(): number {
    const gstValue: number = this.gstOnSubTotal();
    const subTotal: number = this.subTotal();
    return  gstValue + subTotal;
  }
  resetForm(): void {
    this.mProducts = [];
  }
  addProduct(): void {
    this.oneProduct.total = this.oneProduct.qty * this.oneProduct.cost;
    this.mProducts.push({...this.oneProduct});
    this.oneProduct = {
      desc: "",
      qty: 1,
      cost: 1,
      total: 0
    }
    console.log(this.mProducts)
  }
  productName(index: number, product: IProducts): IProducts {
    return product;
  }
  getTotalAmountOfProduct(index: number): void {
    this.mProducts[index].total = this.mProducts[index].qty * this.mProducts[index].cost;
  }
  removeProduct(index: number): void {
    this.mProducts.splice(index, 1)
  }
  subTotal(): number {
    return this.mProducts.reduce((previousValue: number, currentValue: IProducts) => previousValue + currentValue.total, 0);
  }

}
export interface IProducts {
  desc: string;
  qty: number;
  cost: number;
  total: number;
}
