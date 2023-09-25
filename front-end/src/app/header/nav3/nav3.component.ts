import { Component, OnInit } from '@angular/core';
import { NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-nav3',
  templateUrl: './nav3.component.html',
  styleUrls: ['./nav3.component.scss'],
  // imports: [NgbDropdownMenu]
})
export class Nav3Component implements OnInit{
  logo_xlevel = '../../../assets/images/logoxlevel1.svg';
  carritoItems:string='0';
  favItems:string='';
  sidebarVisible:boolean=false;
  categorias=[
    {
      
      nombre:'iPhone',
      link:'#searchlink?',
      icon_svg :'fontello'
    },
    {
      nombre:'iPad',
      link:'#searchanotherlink'
    },
    {
      nombre:'Macbook',
      link:'#searchanotherlink'
    },
    {
      nombre:'AirPods',
      link:'#searchanotherlink'
    },

  ]
  
  constructor(
    private cart:CarritoService, private user:UsuariosService,
    
    ){
    this.cart.cartItems.subscribe(
      (d)=>{
        console.log(d)
        if (d==undefined){
          this.carritoItems='0'
        } else{
          this.carritoItems= d.length.toString()
        }
        
      }
      
    );

    this.cart.sidebar.subscribe(
      data=>{
        this.sidebarVisible=data
      }
    );
  }
  ngOnInit(): void {
    this.cart.cartItems.subscribe(
      (d)=>{
        this.carritoItems= d.length.toString()
      }
      
    );
    this.favItems = this.user.getFavs().toString();
    
  }

  emitSidebar(event:any):void{
    this.cart.sidebar.next(true)
  }
}
