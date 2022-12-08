import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from './shared/constants/routes-config';

const routes: Routes = [
  {
    path: RoutesConfig.root,
    pathMatch: 'full',
    redirectTo: 'products/list',
  },
  {
    path: RoutesConfig.productsList,
    loadChildren: () => import('./pages/products/all-products/all-products.module').then((m) => m.AllProductsModule),
  },
  {
    path: RoutesConfig.productsSelected,
    loadChildren: () => import('./pages/products/selected-products/selected-products.module').then((m) => m.SelectedProductsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
