import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { CarritoService } from './services/carrito/carrito.service';
import { ProductoModel } from './Shared/Models/productos.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'XLevel';
  sidebarVisible:boolean=false;
  carritoSidebarClass:string='carritoSidebar'
  listaProductos:ProductoModel[]=[
    {
      ID_PRODUCTO:0,
      CODIGOPRINCIPAL:'abcd-1111',
      NOMBRE:'Producto 1',
      PRECIOSINIVA: 150.99,
      order_qty:1,
    },
    {
      ID_PRODUCTO:2,
      CODIGOPRINCIPAL:'abcd-1112',
      NOMBRE:'Producto 2',
      PRECIOSINIVA: 152.99,
      order_qty:2,
    }
  ]
  constructor (
    private api:ApiService,
    private cart:CarritoService,
  ){
    this.cart.sidebar.subscribe(
      data=>{
        this.sidebarVisible=data
      }
    )

    }
  ngOnInit(): void {
    // this.cart.cartItems.subscribe(
    //   (data)=>{
    //     this.listaProductos=data
    //   }
    // )
  }

}
