import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductDialogComponent } from './manage-product-dialog.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ManageProductDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ToastModule,
  ],
  providers: [FormBuilder],
})
export class ManageProductDialogModule { }
