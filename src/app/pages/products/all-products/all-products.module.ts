import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AllProductsComponent } from './all-products.component';



@NgModule({
  declarations: [AllProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: AllProductsComponent,
    }])
  ]
})
export class AllProductsModule { }
