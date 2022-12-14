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
    return this.http.post<{data: IProductModel}>(`${ApiConfig.product}`, { ...dto }).pipe(
      map((res) => res.data),
    );
  }

  public patch(id: number, dto: Partial<IProductModel>): Observable<IProductModel> {
    return this.http.patch<{data: IProductModel}>(`${ApiConfig.product}/${id}`, { ...dto }).pipe(
      map((res) => res.data),
    );
  }

  public delete(id: number): Observable<IProductModel> {
    return this.http.delete<{data: IProductModel}>(`${ApiConfig.product}/${id}`).pipe(
      map((res) => res.data),
    );
  }

  public addImage(id: number, fileList: FileList): Observable<IProductModel> {
    console.log(fileList);
    const file = fileList[0];
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<{data: IProductModel}>(`${ApiConfig.product}/${id}/image`,  formData).pipe(
      map((res) => res.data),
    );
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
