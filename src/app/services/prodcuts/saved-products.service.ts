import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IProductModel } from './model/IProductModel';

export const SAVED_PRODUCTS_STORAGE_KEY = 'saved-products';

@Injectable({ providedIn: 'root' })
export class SavedProductsService {
  private _savedProducts$: BehaviorSubject<IProductModel[]> = new BehaviorSubject<IProductModel[]>(
    JSON.parse(localStorage.getItem(SAVED_PRODUCTS_STORAGE_KEY) || '[]')
  );

  public getProductsList(): Observable<IProductModel[]> {
    return this._savedProducts$.asObservable();
  }

  public addProduct(product: IProductModel): void {
    this._syncProducts([...this._savedProducts$.getValue(), product]);
  }

  public removeProduct(id: number) {
    const newProductsList = this._savedProducts$.getValue().filter((el) => el.id !== id);
    this._syncProducts(newProductsList);
  }

  public existInSaved$(product: IProductModel): Observable<boolean> {
    return this._savedProducts$.pipe(map((list) => list.some((el) => el.id === product.id)));
  }

  private _syncProducts(newProductsList: IProductModel[]) {
    this._savedProducts$.next(newProductsList);
    localStorage.setItem(SAVED_PRODUCTS_STORAGE_KEY, JSON.stringify(this._savedProducts$.getValue()));
  }
}
