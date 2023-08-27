import { DataViewModule } from 'primeng/dataview';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http'
import { TiendaComponent } from './tienda/tienda.component';
import { Nav2Component } from './header/nav2/nav2.component';
import { Nav3Component } from './header/nav3/nav3.component';
import { Nav1Component } from './header/nav1/nav1.component';
import { ServicioclienteComponent } from './pages/serviciocliente/serviciocliente.component';
import { UbicanosComponent } from './pages/ubicanos/ubicanos.component';
import { PrecompraComponent } from './pages/precompra/precompra.component';
import { PrecompraayudaComponent } from './pages/precompraayuda/precompraayuda.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CarritosideComponent } from './tienda/carritoside/carritoside.component';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenubarModule } from 'primeng/menubar';
import { GraphQLModule } from './graphql.module';
import { ProductoComponent } from './tienda/producto/producto.component';
import { CarritoComponent } from './tienda/carrito/carrito.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    TiendaComponent,
    Nav2Component,
    Nav3Component,
    Nav1Component,
    ServicioclienteComponent,
    UbicanosComponent,
    PrecompraComponent,
    PrecompraayudaComponent,
    ProductosComponent,
    CarritosideComponent,
    ProductoComponent,
    CarritoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // NgxPaginationModule,
    NgbModule,
    FormsModule,
    RatingModule,
    DataViewModule,
    TagModule,
    DropdownModule,
    BreadcrumbModule,
    CarouselModule,
    ButtonModule,
    MenubarModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
