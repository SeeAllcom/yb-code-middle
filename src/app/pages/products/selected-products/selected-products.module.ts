import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectedProductsComponent } from './selected-products.component';

@NgModule({
  declarations: [SelectedProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: SelectedProductsComponent,
    }])
  ]
})
export class SelectedProductsModule { }
