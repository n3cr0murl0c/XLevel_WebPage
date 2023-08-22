import { AuthResponse } from './../Shared/Models/productos.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { BodegaDataResponse, BodegaResponse } from './Productos/producto.interface';
import { ProductoModel,BodegaResponse } from '../Shared/Models/productos.models';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  list_productos?: Observable<ProductoModel[]>
  respuesta_api?: Observable<ProductoModel>
  respuesta_auth?:Observable<AuthResponse>
  readonly username:string ='MISCHEL.ESCOBAR';
  readonly password:string = '2023MISC'
  token?:string;
  readonly bodegas:string[] = ['XLEVEL BODEGA','B. X LEVEL L40', 'B. X LEVEL L28']
  bodegas_endpoint:string='https://api.getsoft.app/login/filterCellar/'+this.token;
  
  constructor(private http: HttpClient) { 
    
  }
  
  whichBodegas(){
    return this.bodegas
  }
  updateToken():void{
    console.log('Probando generar nuevo token')
    this.http.post<AuthResponse>(
      'https://api.getsoft.app/login/validateAccess',
      {
        login:this.username,
        clave:this.password
      }
    ).subscribe(
      {
        next: (data)=>{
          if (data.success===true){
            console.log(data.mensaje)
            this.token=data.token
          }else{
            if (data.mensaje.includes('No se encontro registros')){
              console.log('API AUTH ERROR:','usuario y contraseña erroroneos');
            }else{
              console.log('API AUTH ERROR:',data.mensaje);
            }


          }
        },
        error:error=>{
          console.log(error)
        },
        complete: ()=>{
          console.log('UpdateToken sync finish')
        }
      }
    )
  }
  getProductos(bodega:string):Observable<BodegaResponse>{
    let payload = {
      bodega: bodega,
      categoria:'',
      codigo:'',
      producto:''
    }
    return this.http.post<BodegaResponse>(this.bodegas_endpoint,payload) 
  }
  getProductosCategoria(bodega:string,categoria_filtrar:string):Observable<BodegaResponse>{
    let payload = {
      bodega: bodega,
      categoria:categoria_filtrar,
      codigo:'',
      producto:''
    }
    return this.http.post<BodegaResponse>(this.bodegas_endpoint,payload) 
  }
   
  
}
