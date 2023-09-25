import { ResponseQL,Producto } from './../../Shared/Models/product-ql.model';
import { Observable, of,map, pluck } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ProductoModel } from 'src/app/Shared/Models/productos.models';

export const MEDIA_PATH ='http://localhost:8089/media/';

const PRODUCTS_QUERY = gql(`{
  productos {
    id
    enDestacado
    enDescuento
    codigoPrincipal
    imageHeight
    imageWidth
    imagenes
    nombre
    precio
    rating
  }
}`)

const PRODUCT_QUERY = gql(`{
  productos(itemId: $itemId) {
    codigoPrincipal
    enDescuento
    enDestacado
    id
    imageHeight
    imageWidth
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

  getProducts():Observable<ProductoModel[]>{
   return (this.graphQL.query<ResponseQL>(
      {
        query:PRODUCTS_QUERY
      }
      ) )
      .pipe(
        map(
          response => {
            // console.log('en mapeo de getProductAPI dentro del service pasando de type(ResponseQL) to type(Producto[])')
            // console.log('en pipe.map')
            // console.log(response.data.productos)
  
            var new_array=response.data.productos.map(
              item=>{
                //Cambio cada item a un nuevo objeto tipo PRODUCTO    
                let model = new ProductoModel(
                  item.id,
                  item.codigoPrincipal,
                  item.nombre,
                  item.precio,
                  
                )
                model.imageURL=item.imagenes
                model.stars=item.rating

                return model
              }
            )
            console.log('final de mapeo en servicios')
            console.log(new_array)
            //retorno en el stream de datos una lista de Productos
            return new_array
            
          }
        ),
        
      )
      
    
  }

  getProducto(id:number):Observable<ProductoModel>{
    
    // console.log('en getProducto APISERVICE',id)
    let query=gql(
      `query MyQuery($itemId: ID = "") {
        productos(itemId: $itemId) {
          codigoPrincipal
          enDescuento
          enDestacado
          id
          imageHeight
          imageWidth
          imagenes
          nombre
          precio
          rating
        }
      }`
    , )

    return this.graphQL.query<ResponseQL>(
      {
        query:query,
        variables:{
          itemId:id
        }
      }
      
    )
    .pipe(//Convierto de Respuesta graphSQL a Producto
      
      map(
        response => {
          // console.log('en mapeo de getProductAPI dentro del service pasando de type(ResponseQL) to type(Producto[])')
          // console.log('en pipe.map')
          // console.log(response.data.productos)

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
          // console.log('final de mapeo en servicios')
          // console.log(new_array)
          //retorno en el stream de datos una lista de Productos
          return new_array[0]
          
        }
      )
    )
    .pipe(//Convierto de Producto a ProductoModel
      map( item=>{
        let model= new ProductoModel(
          item.id,
          item.codigoPrincipal,
          item.nombre,
          item.precio,
        )
        model.imageURL= item.imagenes
        model.ESTADO='EN STOCK'
        return model
      })
    )
  }
}
