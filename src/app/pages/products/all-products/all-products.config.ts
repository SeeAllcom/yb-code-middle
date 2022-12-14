import { AllProductsComponent } from './all-products.component';
import { IProductModel } from '../../../services/prodcuts/model/IProductModel';

export interface IProductAction {
  label: string;
  onAction: (product: IProductModel) => void;
}

export const PRODUCT_ACTIONS: (context: AllProductsComponent) => IProductAction[] = (context: AllProductsComponent) => [
  {
    label: 'Edit',
    onAction: (product: IProductModel) => context.onEdit(product),
  },
  {
    label: 'Delete',
    onAction: (product: IProductModel) => context.onDelete(product),
  },
]
