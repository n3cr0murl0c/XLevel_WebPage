import { Component } from '@angular/core';
import { Producto, ProductosModel } from '../Shared/Models/productos.models';
import { ProductosService } from '../services/productos.service';
import { BodegaDataResponse } from './../services/Productos/producto.interface';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent {
  //***********ATRIBUTOS***********//
  productos:ProductosModel[] = []
  pagina:number = 1;
  count:number = 0;
  tableSize: number = 7;
  tableSizes: number[] = [3,6,7,19];
  //***********CONSTRUCTOR(INIT)***********//
  constructor(private productosservice:ProductosService){

  }

  //***********METHODS***********//
  ngOnInit():void{
    this.fetchProductos();
  }

  fetchProductos():void {
    console.log(this.productosservice.whichBodegas()[0])
    this.productosservice.getProductos(this.productosservice.bodegas[0])
    .subscribe(
      {
        next: (data) => {
          // console.log(data);
          if (data.success===true){
            console.log(data.mensaje);
            this.productos = data.dataResponse;
          } else {
            console.log('error:',data.mensaje);
          }
          },
        error: error =>{
          console.log(error)
          },
        complete: ()=>{
          console.log('fecthProducts Finish')
          }
      }
      
    )
  }

  onTableDataChange ( event:any){
    this.pagina = event;
    this.fetchProductos();
  }

  onTableSizeChange(event:any):void{
    this.tableSize = event.target.value;
    this.pagina=1;
    this.fetchProductos();
  }

}
