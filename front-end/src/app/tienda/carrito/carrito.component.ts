import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  sidebarVisible:boolean=false;
  constructor(
    private cart:CarritoService,
  ){
   this.cart.sidebar.subscribe(
    data=>{
      this.sidebarVisible=data
    }
   ) 
  }
}
