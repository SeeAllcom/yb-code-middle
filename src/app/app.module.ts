import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarMenuModule } from './components/sidebar-menu/sidebar-menu.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ManageProductDialogModule } from './components/manage-product-dialog/manage-product-dialog.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SidebarMenuModule,
    HttpClientModule,
    ManageProductDialogModule,
    ToastModule,
  ],
  providers: [HttpClient, MessageService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
