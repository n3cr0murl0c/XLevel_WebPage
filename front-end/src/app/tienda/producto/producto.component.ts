import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoModel } from 'src/app/Shared/Models/productos.models';
import { ApiService } from 'src/app/services/api/api.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  pictures = [
    "https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones1.png?raw=true",
    "https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones2.png?raw=true",
    "https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true",
    "https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true",
    "https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true"
  ]
  producto!:ProductoModel;
  control_index:number=0;
  client:any;
  constructor(
    private http:ProductoService,
    private graphQL:ApiService,
    private route:ActivatedRoute,
    private cart:CarritoService
    ){
      
    }
  ngOnInit(): void {
    // console.log(this.route.snapshot.params['ID_PRODUCTO'])
    this.graphQL.getProducto(this.route.snapshot.params['ID_PRODUCTO'])
    .subscribe(
      {
        next: data=>{
          this.producto = data
          console.log('', this.producto)
          // this.producto.imageURL=this.pictures
        },
        error: e=>{
          console.log('ERROR AL CONSULTAR LA API')
          console.log(e)

        },
        complete:()=>{
          // console.log('finish?') 
        }
        

        
      }
    )


  }

  previousSlide(event:any){
    console.log('back  slide event')
    if (this.control_index>0 && this.control_index<=this.pictures.length) {
      this.control_index=this.control_index-1
    }
  }
  nextSlide(event:any){
    console.log('next slide event')
    if (this.control_index>=0 && this.control_index<=this.pictures.length) {
      this.control_index=this.control_index+1
    }
  }
  addToFavorites(event:any,product_id:number,client_id:number){
    console.log('en addToCart')
    console.log(event)
  };
  productRating(event:any,item_id:number):void{
    //Catch stars rating change
    
    
    
    console.log('Rating Change:','Id: ',this.producto.ID_PRODUCTO,'stars: ',this.producto.stars);
    
    
    // console.log(this.productos[0].id==item_id)
  };

  addToCart(product:ProductoModel){
    this.cart.addItem(product);
  }
}
