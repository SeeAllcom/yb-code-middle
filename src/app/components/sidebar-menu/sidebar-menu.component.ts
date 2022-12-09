import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SIDEBAR_MENU } from './sidebar-menu.config';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMenuComponent {
  public items: MenuItem[] = SIDEBAR_MENU;
}
