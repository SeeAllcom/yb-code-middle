import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../shared/constants/api-config';
import { map, Observable } from 'rxjs';
import { IProductModel } from './model/IProductModel';
import { ManageProductDialogComponent } from '../../components/manage-product-dialog/manage-product-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

interface IProductsResponse {
  products: IProductModel[],
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private dialogService = inject(DialogService);

  public getList(): Observable<IProductModel[]> {
    return this.http.get<IProductsResponse>(`${ApiConfig.products}`).pipe(map((res) => res.products));
  }

  public add(dto: Partial<IProductModel>): Observable<IProductModel> {
    return  this.http.post<IProductModel>(`${ApiConfig.products}add`, { ...dto });
  }

  public put(id: number, dto: Partial<IProductModel>): Observable<IProductModel> {
    return  this.http.put<IProductModel>(`${ApiConfig.products}${id}`, { ...dto });
  }

  public delete(id: number): Observable<IProductModel> {
    return this.http.delete<IProductModel>(`${ApiConfig.products}${id}`);
  }

  public openManageDialog(product?: IProductModel) {
    return this.dialogService.open(ManageProductDialogComponent, {
      header: !!product ? 'Product editing' : 'Add new product',
      width: '600px',
      height: '600px',
      closable: true,
      data: { product },
    });
  }
}
