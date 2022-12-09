import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IProductModel } from '../../../services/prodcuts/model/IProductModel';
import { SavedProductsService } from '../../../services/prodcuts/saved-products.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-selected-products',
  templateUrl: './selected-products.component.html',
  styleUrls: ['./selected-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedProductsComponent implements OnInit {
  private confirmDialog = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private savedProductsService = inject(SavedProductsService);

  public products$: BehaviorSubject<IProductModel[]> = new BehaviorSubject<IProductModel[]>([]);
  constructor() { }

  ngOnInit(): void {
    this._getSelectedProductsList();
  }

  public onDelete(product: IProductModel): void {
    this.confirmDialog.confirm({
      header: 'Confirm your actions!',
      rejectButtonStyleClass: 'p-button-outlined',
      message: 'Are you sure you want to delete the selected product?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.savedProductsService.removeProduct(product.id);
        this.messageService.add({ severity: 'success', summary: 'The product has been successfully removed from the saved' });
        this._getSelectedProductsList();
      },
    });
  }

  private _getSelectedProductsList(): void {
    this.savedProductsService.getProductsList()
      .pipe(take(1), untilDestroyed(this))
      .subscribe((list) => {
        this.products$.next(list);
      })
  }
}
