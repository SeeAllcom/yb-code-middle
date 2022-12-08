import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-products',
  templateUrl: './selected-products.component.html',
  styleUrls: ['./selected-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
