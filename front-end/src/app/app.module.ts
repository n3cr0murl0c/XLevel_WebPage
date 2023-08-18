import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http'

import { NgxPaginationModule } from 'ngx-pagination';
import { TiendaComponent } from './tienda/tienda.component';
import { Nav2Component } from './header/nav2/nav2.component';
import { Nav3Component } from './header/nav3/nav3.component';
import { Nav1Component } from './header/nav1/nav1.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    TiendaComponent,
    Nav2Component,
    Nav3Component,
    Nav1Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
