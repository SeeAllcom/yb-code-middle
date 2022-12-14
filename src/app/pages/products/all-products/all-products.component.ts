import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IProductModel } from '../../../services/prodcuts/model/IProductModel';
import { ProductsService } from '../../../services/prodcuts/products.service';
import { BehaviorSubject, filter, Observable, take } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PRODUCT_ACTIONS } from './all-products.config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SavedProductsService } from '../../../services/prodcuts/saved-products.service';
import { environment } from '../../../../environments/environment';

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
  private savedProductsService = inject(SavedProductsService);

  public products$: BehaviorSubject<IProductModel[]> = new BehaviorSubject<IProductModel[]>([]);
  public readonly actions = PRODUCT_ACTIONS(this);
  public readonly API_URL = environment.API;

  ngOnInit(): void {
    this._getProductsList();
  }

  public existInSaved$(product: IProductModel): Observable<boolean> {
    return this.savedProductsService.existInSaved$(product);
  }

  public onAddImage(product: IProductModel, value: FileList): void {
    this.productsService.addImage(product.id, value)
      .pipe(
        take(1),
        untilDestroyed(this),
      )
      .subscribe((product) => {
        this._getProductsList();
      });
  }

  public onAdd(): void {
    this.productsService.openManageDialog().onClose
      .pipe(
        take(1),
        filter((product) => !!product?.id),
        untilDestroyed(this),
      )
      .subscribe((product) => {
        this._getProductsList();
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
        this._getProductsList();
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
        this.savedProductsService.removeProduct(id);
        this._getProductsList();
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
