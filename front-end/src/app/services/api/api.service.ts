import { ResponseQL,Producto } from './../../Shared/Models/product-ql.model';
import { Observable, of,map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

const PRODUCTS_QUERY = gql(`{
  productos {
    codigoPrincipal
    id
    imagenes
    nombre
    precio
    rating
  }
}`)

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private graphQL:Apollo) { }

  getProducts(){
   return (this.graphQL.query<ResponseQL>(
      {
        query:PRODUCTS_QUERY
      }
      ) )
      .pipe(
        map(
          response => {
            console.log('en mapeo de getProductAPI dentro del service pasando de type(ResponseQL) to type(Producto[])')
            console.log('en pipe.map')
            console.log(response.data.productos)
  
            var new_array=response.data.productos.map(
              item=>{
                //Cambio cada item a un nuevo objeto tipo PRODUCTO    
                return new Producto(
                  item.id,
                  item.codigoPrincipal,
                  item.imagenes,
                  item.nombre,
                  item.precio,
                  item.rating,
                  
                )
              }
            )
            console.log('final de mapeo en servicios')
            // console.log(new_array)
            //retorno en el stream de datos una lista de Productos
            return new_array
            
          }
        )
      )
    
  }
}
