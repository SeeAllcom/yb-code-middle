import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProductModel } from '../../services/prodcuts/model/IProductModel';
import { take } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductsService } from '../../services/prodcuts/products.service';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'app-manage-product-dialog',
  templateUrl: './manage-product-dialog.component.html',
  styleUrls: ['./manage-product-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageProductDialogComponent implements OnInit {
  private productsService = inject(ProductsService);
  private messageService = inject(MessageService);

  public form: FormGroup = this.fb.group({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    brand: new FormControl('', [Validators.required]),
  });
  public product: IProductModel;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
  ) {
    this.product = this.dialogConfig.data.product;
  }

  ngOnInit(): void {
    this._setValue(this.product);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return this.messageService.add({ severity: 'warn', summary: 'Please fill in all required fields' });
    }

    if (!!this.product?.id) {
      this._onEdit();
    } else {
      this._onAdd();
    }
  }

  private _onAdd(): void {
    this.productsService.add(this.form.getRawValue())
      .pipe(take(1), untilDestroyed(this))
      .subscribe((product) => {
        this.messageService.add({ severity: 'success', summary: 'Product added successfully' });
        this.ref.close(product)
      })
  }

  public _onEdit(): void {
    this.messageService.add({ severity: 'success', summary: 'Product updated successfully' });
    this.ref.close({
      ...this.product,
      ...this.form.getRawValue(),
    })
  }

  private _setValue(product?: IProductModel) {
    this.form.patchValue({
      id: product?.id || '',
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price || '',
      brand: product?.brand || '',
    })
  }
}
