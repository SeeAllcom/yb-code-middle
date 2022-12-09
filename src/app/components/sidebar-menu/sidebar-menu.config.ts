import { MenuItem } from 'primeng/api';
import { RoutesConfig } from '../../shared/constants/routes-config';

export const SIDEBAR_MENU: MenuItem[] = [
  {
    label: 'All products',
    routerLink: RoutesConfig.productsList,
  },
  {
    label: 'Selected products',
    routerLink: RoutesConfig.productsSelected,
  },
]
