import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectedProductsComponent } from './selected-products.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [SelectedProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: SelectedProductsComponent,
    }]),
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    RippleModule,
  ],
  providers: [ConfirmationService]
})
export class SelectedProductsModule { }
