import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IProductModel } from '../../../services/prodcuts/model/IProductModel';
import { ProductsService } from '../../../services/prodcuts/products.service';
import { BehaviorSubject, filter, Observable, take } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PRODUCT_ACTIONS } from './all-products.config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SavedProductsService } from '../../../services/prodcuts/saved-products.service';

@UntilDestroy()
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private confirmDialog = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);
  private savedProductsService = inject(SavedProductsService);

  public products$: BehaviorSubject<IProductModel[]> = new BehaviorSubject<IProductModel[]>([]);
  public readonly actions = PRODUCT_ACTIONS(this);

  ngOnInit(): void {
    this._getProductsList();
  }

  public existInSaved$(product: IProductModel): Observable<boolean> {
    return this.savedProductsService.existInSaved$(product);
  }

  public onAdd(): void {
    this.productsService.openManageDialog().onClose
      .pipe(
        take(1),
        filter((product) => !!product?.id),
        untilDestroyed(this),
      )
      .subscribe((product) => {
        console.log(this.products$.getValue());
        this.products$.next([product, ...this.products$.getValue()]);
      });
  }

  public onEdit(product: IProductModel): void {
    this.productsService.openManageDialog(product).onClose
      .pipe(
        take(1),
        filter((product) => !!product?.id),
        untilDestroyed(this),
      )
      .subscribe((product) => {
        const updatedProductIndex = this.products$.getValue().findIndex((el) => el.id === product.id)
        this.products$.getValue()[updatedProductIndex] = product;
        this.products$.next(this.products$.getValue());
      });
  }

  public onDelete(product: IProductModel): void {
    this.confirmDialog.confirm({
      header: 'Confirm your actions!',
      rejectButtonStyleClass: 'p-button-outlined',
      message: 'Are you sure you want to delete the selected product?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this._deleteProduct(product.id),
    });
  }

  public toggleProductToSaved(value: boolean, product: IProductModel) {
    switch (value) {
      case true:
        this.savedProductsService.addProduct(product);
        this.messageService.add({
          severity: 'success',
          summary: 'The product has been successfully added to your favorites',
        });
        break;
      case false:
        this.savedProductsService.removeProduct(product.id);
        this.messageService.add({
          severity: 'success',
          summary: 'The product has been successfully removed from the saved',
        });
        break;
    }
  }

  private _deleteProduct(id: number): void {
    this.productsService.delete(id)
      .pipe(take(1), untilDestroyed(this))
      .subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Product deleted successfully' });
        this.products$.next(this.products$.getValue().filter((el) => el.id !== res.id));
        this.savedProductsService.removeProduct(id);
      });
  }

  private _getProductsList(): void {
    this.productsService.getList()
      .pipe(take(1), untilDestroyed(this))
      .subscribe((products) => {
        this.products$.next(products);
      });
  }
}
