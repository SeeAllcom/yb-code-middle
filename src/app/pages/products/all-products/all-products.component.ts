import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
