import { HttpClient } from '@angular/common/http';
import { FactoryTarget } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthResponse, BodegaResponse, Producto } from 'src/app/Shared/Models/productos.models';

const BODEGA_URL = "https://api.getsoft.app/login/filterCellar/"
const AUTH_URL = "https://api.getsoft.app/login/validateAccess"
@Injectable({
  providedIn: 'root'
})
export class ProductoService implements OnInit {
  private readonly login = "MISCHEL.ESCOBAR"
  private readonly password = '2023.MISC'
  bodegas = ['','','']
  token:string='';
  tokenReady:Boolean=false;
  constructor(private http:HttpClient) { 
    
  }
  ngOnInit(): void {
    this.updateToken()
  }
  updateToken(){
    this.http.post<AuthResponse>(
      AUTH_URL,
      {
        usuario:this.login,
        password:this.password
      }
    )
    .subscribe(
      {
        next: (data) =>{
          if (data.success){
            this.token=data.token
            this.tokenReady=true
            console.log(data.mensaje)
          }else{
            console.log('AUTH_ERROR',data.mensaje)
          }
        },
        error: (e)=>{
          console.log('api_error',e)
        }
      }
    )
  }
  getProductos(bodega:string):Observable<BodegaResponse>{
    let bodega_payload ={
      bodega:bodega,
      categoria:'',
      codigo:'',
      producto:''
    }
    return this.http.post<BodegaResponse>(
      BODEGA_URL+this.token,
      bodega_payload
    )
  }

  getProducto(id:number):Observable<BodegaResponse>[]{
    let aux=[]
    for (let i = 0; i < this.bodegas.length; i++) {
      let bodega_payload ={
        bodega:this.bodegas[i],
        categoria:'',
        codigo:id,
        producto:''
      }
      aux.push(this.http.post<BodegaResponse>(
        BODEGA_URL+this.token,
        bodega_payload
      )  )
      
    }
    return aux
    
  }
  getProductosporCategoria(categoria:string):Observable<BodegaResponse>[]{
    let aux=[]
    for (let i = 0; i < this.bodegas.length; i++) {
      let bodega_payload ={
        bodega:this.bodegas[i],
        categoria:categoria,
        codigo:'',
        producto:''
      }
      aux.push(this.http.post<BodegaResponse>(
        BODEGA_URL+this.token,
        bodega_payload
      )  )
      
    }
    return aux
  }
  whichBodega(){
    return this.bodegas
  }
}
