
import { Component, OnInit } from '@angular/core';
import { Producto, ProductoModel, } from '../Shared/Models/productos.models';

import { SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Observable,map,of } from 'rxjs';


import { asyncMap } from '@apollo/client/utilities';
import { ProductoService } from '../services/producto/producto.service';
import { ApiService } from '../services/api/api.service';

// import {} from '../../../../graphQL_API/media/'
const MEDIA_PATH ='http://localhost:8089/media/'


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  //***********ATRIBUTOS***********//

  home?:MenuItem  
  menu_items?:MenuItem[]
  productos:ProductoModel[] = []
  productoss:any;
  // productos:Producto[] = []
  pagina:number = 1;
  count:number = 0;
  tableSize: number = 7;
  tableSizes: number[] = [3,6,7,19];
  filtros:string='tags ,categorias ,precios'

  sortOptions!: SelectItem[];
  sortOptions2!: SelectItem[];
  sortOptions3!: SelectItem[];
  sortKey?:string;
  sortKey2?:string;
  sortKey3?:string;

  layout:any='grid';
  sortOrder!: number;
  sortField!: string;

  pagPosition:any='bottom'
  dataStyle:any='container-fluid'
  pdataStyle:any='container-fluid'
  gridStyle:any='container-sm row-cols-auto'
  menuStyle:any='bg-white'

  client?:any;

  options_tienda?:MenuItem[]
  //***********Varibles Observables para Asyncs******************//
  lista_productos?:Observable<Producto>[];
  lista_productos_filtrado?:Observable<Producto>[];
  media=MEDIA_PATH
  //***********CONSTRUCTOR(INIT)***********//
  constructor(private xLevel_api:ProductoService, private apollo:ApiService,
              private grapQL_api:ApiService
               ){
    //in producton csrf excepmt will be down, so apollo needs to send the csrftoken
    // headers: {
    //   'X-CSRFToken': Cookies.get('csrftoken')
    // }
  }

  //***********METHODS***********//
  ngOnInit():void{
    this.grapQL_api.getProducts()
    .subscribe(
      {
        next: (response)=>{
          console.log('en getProductsAPI() llamando de graphQL')
          // Object.keys(response).forEach(key => console.log(key));
          console.log('en mapeo de getProductAPI pasando de type(Producto) to type(ProductoModel)')
          //la funcion ya envía cambiado el array a un array de productos.
          this.productos = response.map(
            item=>{
              
              // console.log(item)
              // Object.keys(item).forEach(key => console.log(key));
              let model=new ProductoModel(
                item.id,
                item.codigoPrincipal,
                item.nombre,
                item.precio,
                // imageURL=item.imagenes[0]
              )
              model.imageURL= item.imagenes
              model.ESTADO='EN STOCK'
              return model
            }
          )
          console.log(this.productos)
        },
        error: (e)=>{
          console.log('APIERROR',e)
          alert('API ERROR | '+e)
        }
      }
    )
      
    this.sortOptions = [
      { label: 'Precio Mayor a Menor', value: '!price' },
      { label: 'Precio Menor a Mayor', value: 'price' }
    ];
    this.sortOptions2 = [
      { label: 'Categoria1', value: 'categoria1' },
      { label: 'categoria2', value: 'categoria2' }
    ];
    this.sortOptions3 = [
      { label: 'marca1', value: 'marca1' },
      { label: 'marca2', value: 'marca2' }
    ];
    this.menu_items =[{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

    this.home={icon:'pi pi-home',routerLink:'/'}

    this.options_tienda=[
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

  addToCart(event:any,product_id:number,client_id:number){
    console.log('en addToCart')
    console.log(event)
  };
  addToFavorites(event:any,product_id:number,client_id:number){
    console.log('en addToCart')
    console.log(event)
  };
  
    

}
