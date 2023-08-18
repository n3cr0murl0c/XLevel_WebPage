import { AuthResponse } from './../Shared/Models/productos.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodegaDataResponse, BodegaResponse } from './Productos/producto.interface';
import { ProductosModel } from '../Shared/Models/productos.models';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  list_productos?: Observable<ProductosModel[]>
  respuesta_api?: Observable<BodegaDataResponse>
  respuesta_auth?:Observable<AuthResponse>
  readonly username:string ='MISCHEL.ESCOBAR';
  readonly password:string = '2023MISC'
  token?:string;
  readonly bodegas:string[] = ['XLEVEL BODEGA','B. X LEVEL L40', 'B. X LEVEL L28']
  bodegas_endpoint:string='https://api.getsoft.app/login/filterCellar/'+this.token;
  
  constructor(private http: HttpClient) { 
    this.http.post<AuthResponse>(
      'https://api.getsoft.app/login/validateAccess',
      {
        login:this.username,
        clave:this.password
      }
    ).subscribe(
      data=>{
        if (data.success==true){
          console.log(data.mensaje)
          this.token = data.token;
        }else{
          console.log(data.mensaje)
        }
        
      }
    )
  }
  
  whichBodegas(){
    return this.bodegas
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
}
