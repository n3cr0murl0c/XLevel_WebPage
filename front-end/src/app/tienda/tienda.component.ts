
import { Component, OnInit } from '@angular/core';
import { Producto, ProductoModel, } from '../Shared/Models/productos.models';

import { SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Observable,map,of } from 'rxjs';


import { asyncMap } from '@apollo/client/utilities';
import { ProductoService } from '../services/producto/producto.service';
import { ApiService, MEDIA_PATH } from '../services/api/api.service';
import { CarritoService } from '../services/carrito/carrito.service';
import { Client } from '../Shared/Models/client.model';

// import {} from '../../../../graphQL_API/media/'



@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  //***********ATRIBUTOS***********//

  home?:MenuItem = {icon:'pi pi-home',routerLink:'/'} 
  productos:ProductoModel[] = []
  filtros:string='tags ,categorias ,precios'
  //pagination Variables
  pagina:number = 1;
  count:number = 0;
  tableSize: number = 7;
  tableSizes: number[] = [3,6,7,19];
  
  layout:any='grid';
  sortOrder!: number;
  sortField!: string;

  pagPosition:any='bottom'
  dataStyle:any='container-fluid'
  pdataStyle:any='container-fluid'
  gridStyle:any='container-sm row-cols-auto'
  menuStyle:any='dataviewMenu'

  clientModel:Client;

  options_tienda?:MenuItem[]=[
    {
      label: 'Precio',
      icon: 'pi pi-filter',
      items:[
        {
          label:'Mayor a Menor',
          icon: 'pi pi-descend',
          command: (click)=>{
            this.onSortChange('preciomayormenor');
          }
        },
        {
          label:'Menor a Mayor',
          icon: 'pi pi-descend',
          command: (click)=>{
            this.onSortChange('preciomenormayor');
          }
        }
      ]
    }
  ]
  //***********Varibles Observables para Asyncs******************//
  lista_productos?:Observable<Producto>[];
  lista_productos_filtrado?:Observable<Producto>[];
  media=MEDIA_PATH
  //***********CONSTRUCTOR(INIT)***********//
  constructor(private xLevel_api:ProductoService, private apollo:ApiService,
              private grapQL_api:ApiService,
              private cart:CarritoService
               ){
    //in producton csrf excepmt will be down, so apollo needs to send the csrftoken
    // headers: {
    //   'X-CSRFToken': Cookies.get('csrftoken')
    // }
    this.clientModel = new Client(0)
  }

  //***********METHODS***********//
  ngOnInit():void{
    let tienda =this.grapQL_api.getProducts()
    tienda.subscribe(
      {
        next: (response)=>{
          console.log('en getProductsAPI() llamando de graphQL')
          // Object.keys(response).forEach(key => console.log(key));
          // console.log('en mapeo de getProductAPI pasando de type(Producto) to type(ProductoModel)')
          //la funcion ya envía cambiado el array a un array de productos.
          this.productos = response
          // console.log(this.productos)
          console.log('Exito')
        },
        error: (e)=>{
          console.log('APIERROR',e)
          alert('API ERROR | '+e)
        }
      }
    )

    // this.client=new Client(0)
    

  }
  
  
  fetchProductos():boolean {
    let status=false
    console.log('en fetchProductos')
    // console.log(this.xLevel_api.whichBodegas()[0])
    this.xLevel_api.getProductos(this.xLevel_api.bodegas[0])
    .subscribe(
      {
        next: (data) => {
          if (data.success===true){

            console.log(data.mensaje);
            this.productos=data.dataResponse
            status=data.success
          } else {
            console.log('API ERROR:',data.mensaje);
            if(data.mensaje.includes('Token Expirado')){
              
              this.xLevel_api.updateToken();
              status=data.success
            }else{
              status=data.success
            }
          }
          },
        error: error =>{
          console.log(error)
          status= false
          },
        complete: ()=>{
          console.log('fecthProducts Finish')
          status= true
          }
      }
      
    )
    return status
  };
  fetchProductosPerCategory(category:string){
    let list:any[]=[]
    for (let i = 0; i < this.xLevel_api.bodegas.length; i++) {
      this.xLevel_api.getProductosporCategoria(
        category
      )[i]
      .subscribe(
        (data)=>{
          list.push(data.dataResponse)
          console.log(data.mensaje)
        }
      ) 
      
    }
    this.lista_productos_filtrado = list
    return list
       

  };
  productRating(event:any,item_id:number):void{
    //Catch stars rating change
    let obj = this.productos.find(
        item => item.ID_PRODUCTO === item_id

      );
    
    let index=this.productos.findIndex(
      item=> item.ID_PRODUCTO === item_id
    )
    console.log('Rating Change:','Id: ',this.productos[index].ID_PRODUCTO,'stars: ',this.productos[index].stars);
    
    
    // console.log(this.productos[0].id==item_id)
  };
  getSeverity(product: ProductoModel) {
    switch (product.ESTADO) {
        case 'ENSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return '';
    }
  };
  onSortChange(event: any) {
    let value = event.value;
    console.log('En onSortChange()','evento:',event,'value:',event.value)

    // if (value.indexOf('!') === 0) {
    //     this.sortOrder = -1;
    //     this.sortField = value.substring(1, value.length);
    // } else {
    //     this.sortOrder = 1;
    //     this.sortField = value;
    // }
    if (event==='preciomenormayor'){
      console.log('entro a evento preciomenormayor')
      this.productos.sort(
        (first,second)=>{
          return (first.PRECIOSINIVA>second.PRECIOSINIVA? -1:1)
        }
      )
    }

    if (event==='preciomayormenor'){
      console.log('entro a evento preciomayormenor')
      this.productos.sort(
        (first,second)=>{
          return (first.PRECIOSINIVA>second.PRECIOSINIVA? -1:1)
        }
      )
    }

  };

  addToCart(event:any,product:ProductoModel,client:Client){
    console.log('en addToCart TiendaComponent')
    // console.log(event,product,client)
    this.cart.addItem(product)
  };
  addToFavorites(event:any,product:ProductoModel,client:Client){
    console.log('en addToFavorites, Tienda Componenet')
    
  };
  
    
  hoverAnimation(event:any){
    // console.log('animate ME', event.target)
    // event.target.style = 'hover'
  }
}
