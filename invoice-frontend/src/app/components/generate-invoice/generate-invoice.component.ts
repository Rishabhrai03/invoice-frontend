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
    total: 0,
    size: "0"
  };
  private mGstPercentage: number = 18;
  private mProducts: IProducts[] = [];
  editingObject: { index: number | null, isEditing: boolean } = {
    index: null,
    isEditing: false
  };
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
    this.clearForm();
  }
  addProduct(): void {
    let { qty , cost, total, size, desc } = this.oneProduct;
    cost = Math.abs(cost);
    qty = Math.abs(qty);
    total = qty * cost;
    size = size ? size : "-";
    const newProd: IProducts = {
      qty,
      cost,
      total,
      size,
      desc
    }
    this.mProducts.push({...newProd});
    this.clearForm();
    /*
    console.log(this.mProducts)
    */
  }
  productName(index: number, product: IProducts): IProducts {
    return product;
  }
  private getTotalAmountOfProduct(index: number): void {
    this.mProducts[index].total = Math.abs(this.mProducts[index].qty) * Math.abs(this.mProducts[index].cost);
  }
  removeProduct(index: number): void {
    this.mProducts.splice(index, 1);
    this.editingObject = {index: null, isEditing: false};
  }

  editProduct(index: number, product: IProducts): void {
    this.editingObject = {index: index, isEditing: true};
    this.oneProduct = product;
    // this.mProducts[index] = this.oneProduct;
    return;
  }

  saveProduct(): void {
    if (this.editingObject.index || this.editingObject.index === 0) {
      this.mProducts[this.editingObject.index] = this.oneProduct;
      this.getTotalAmountOfProduct(this.editingObject.index);
      this.editingObject = {index: null, isEditing: false};
      this.clearForm();
    }
  }
  subTotal(): number {
    return this.mProducts.reduce((previousValue: number, currentValue: IProducts) => previousValue + currentValue.total, 0);
  }

  private clearForm(): void {
    this.oneProduct = {
      desc: "",
      qty: 1,
      cost: 1,
      total: 0,
      size: "0"
    }
  }

}
export interface IProducts {
  desc: string;
  qty: number;
  cost: number;
  total: number;
  size: string;
}
