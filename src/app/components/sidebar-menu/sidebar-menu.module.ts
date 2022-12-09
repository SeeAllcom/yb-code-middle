import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';


@NgModule({
  declarations: [
    SidebarMenuComponent,
  ],
  exports: [
    SidebarMenuComponent,
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
  ],
})
export class SidebarMenuModule { }
