import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto, ProductoModel } from 'src/app/Shared/Models/productos.models';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  placeholder:ProductoModel[]=[]
  cartItems=new BehaviorSubject(this.placeholder);
  sidebar = new BehaviorSubject<boolean>(false);

  constructor() { 
    // is gonna check for any data in the localstorage
    const ls = this.getCartData();
    //si hay algo, se la emite. Si no, se emite un array vacio
    if (ls) this.cartItems.next(ls)
    
  }

  getItems():number{
    console.log('en getItems Carrito Service',this.placeholder.length)
    return this.placeholder.length
  }
  
  addItem(product:ProductoModel){
    console.log('en addItem Carrito Service',this.getCartData())
    //check if the item exists or is in the array
    let ls=[]
    ls.push(this.getCartData())
    console.log(ls)
    let itemInLS:ProductoModel;
    
    if (ls){
      
      itemInLS = ls.find(
        (i:ProductoModel)=>{
          return i.ID_PRODUCTO=== product.ID_PRODUCTO
        }
      )
      ///Si el producto ya existe, solo sube la cantidad
      if (itemInLS){
        itemInLS.order_qty++;
        this.setCartData([...ls])
      }else{
        //NO Encuentro item en LS, lo agrego y mas data
        let newData = [...ls,product];
        this.setCartData(newData)

      }
    } else{
      
      this.placeholder.push(product);
      this.setCartData(this.placeholder)


    }
  }

  getCartData(){
    let ls:string|null = localStorage.getItem('cart')
    console.log('inside getCartData', ls)
    if (ls !== null){
      console.log('ls is not null?')
      return JSON.parse(ls)
    }{
      console.log('ls is null?-> localstorage empty')
      return []
    }
    
    
  }

  setCartData(data:any){
    localStorage.setItem('cart',JSON.stringify(data))
    this.cartItems.next(this.getCartData())
  }

  sidebarOpen(event:any){

  }
  
  getCartItems():ProductoModel[] | undefined{
    if (!this.getCartData()){
      return undefined
    }else{
      return this.getCartData()
    }
  }
}
