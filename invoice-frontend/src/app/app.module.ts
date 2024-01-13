import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { GenerateInvoiceComponent } from './components/generate-invoice/generate-invoice.component';
import { OnlyNumberDirective } from './directives/only-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    GenerateInvoiceComponent,
    OnlyNumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
