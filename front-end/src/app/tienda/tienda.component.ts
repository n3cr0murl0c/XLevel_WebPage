import { Component, OnInit } from '@angular/core';
import { Producto, ProductoModel } from '../Shared/Models/productos.models';
import { ProductosService } from '../services/productos.service';
import { SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';


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
  contexto={
    lista_productos:this.getAll()
  }
  client?:any;

  options_tienda?:MenuItem[]
  //***********Varibles Observables para Asyncs******************//
  lista_productos?:Observable<Producto>[];
  lista_productos_filtrado?:Observable<Producto>[];
  //***********CONSTRUCTOR(INIT)***********//
  constructor(private productosservice:ProductosService, ){

  }

  //***********METHODS***********//
  ngOnInit():void{
    if (!this.fetchProductos()){
      this.productos=[
        {
          ID_PRODUCTO:1,
          CODIGOPRINCIPAL:'ABCD000',
          NOMBRE:'Bolso Billetera Guess Cuero PU Saffiano',
          PRECIOSINIVA:54.99,
          tags:['Accesorios','Bolsos'],
          imageURL:'0002_GUWBSSABE_3_1800x1800.jpg',
          favorite:false,
          stars:0,
          STOCK:5,
          BODEGA:'XLevel Bodega',
          ESTADO:'activo',
          CATEGORIA:'Accesorio',
          MARCA:'XLVL'
        },
        {
          ID_PRODUCTO:2,
          CODIGOPRINCIPAL:'ABCD001',
          NOMBRE:'Estuche Guess Saffiano Logo Metal iPhone 13 Serie',
          PRECIOSINIVA:49.99,
          tags:['Accesorios','iPhone', 'iPhone 13' ],
          imageURL:'0001_GUHCP13MPSASBPI_4_1800x1800.jpg',
          favorite:false,
          stars:0,
          STOCK:5,
          BODEGA:'XLevel Bodega',
          ESTADO:'activo',
          CATEGORIA:'Accesorio',
          MARCA:'XLVL'
        },
        
      ]
    }
    
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
  getAll():Producto[]{
    return [
      {
        id:1,
        codigo_principal:'ABCD000',
        nombre:'Bolso Billetera Guess Cuero PU Saffiano',
        precio:54.99,
        tags:['Accesorios','Bolsos'],
        imageURL:'0002_GUWBSSABE_3_1800x1800.jpg',
        favorite:false,
        stars:0,
        stock:5,
        bodega:'XLevel Bodega',
        estado:'activo',
        categoria:'Accesorio'
      },
      {
        id:2,
        codigo_principal:'ABCD001',
        nombre:'Estuche Guess Saffiano Logo Metal iPhone 13 Serie',
        precio:49.99,
        tags:['Accesorios','iPhone', 'iPhone 13' ],
        imageURL:'0001_GUHCP13MPSASBPI_4_1800x1800.jpg',
        favorite:false,
        stars:0,
        stock:5,
        bodega:'XLevel Bodega',
        estado:'activo',
        categoria:'Accesorio'
      }
    ]
  };
  
  fetchProductos():boolean {
    let status=false
    console.log('en fetchProductos')
    // console.log(this.productosservice.whichBodegas()[0])
    this.productosservice.getProductos(this.productosservice.bodegas[0])
    .subscribe(
      {
        next: (data) => {
          if (data.success===true){
            console.log(data.mensaje);
            this.productos=data.dataResponse
            status=true
          } else {
            console.log('API ERROR:',data.mensaje);
            if(data.mensaje.includes('Token Expirado')){
              
              this.productosservice.updateToken();
              status= false
            }else{
              status= true
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
  fetchProductosPerCategory(category:string):any{
    let aux:any[]=[]
    for (let i = 0; i < this.productosservice.bodegas.length; i++) {
      this.productosservice.getProductosCategoria(
        this.productosservice.bodegas[i],
        category
      ).subscribe(
        (data)=>{
          aux.push(data.dataResponse)
          this.lista_productos_filtrado = aux
          return this.lista_productos_filtrado
        }
      )
      
    }
    return 'end syncronous'

    

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
  getSeverity(product: Producto) {
    switch (product.estado) {
        case 'INSTOCK':
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
