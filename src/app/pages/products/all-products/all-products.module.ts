import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AllProductsComponent } from './all-products.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ManageProductDialogModule } from '../../../components/manage-product-dialog/manage-product-dialog.module';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [AllProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: AllProductsComponent,
    }]),
    TableModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    OverlayPanelModule,
    MessagesModule,
    ConfirmDialogModule,
    DialogModule,
    ManageProductDialogModule,
    FormsModule,
    MessageModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class AllProductsModule { }
