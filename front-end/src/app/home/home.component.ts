import { MEDIA_PATH } from './../services/api/api.service';
import { Component, ViewChild, OnInit,  } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../Shared/Models/productos.models';

import { ApiService,} from '../services/api/api.service';
import { ProductoService } from '../services/producto/producto.service';
import { CarritoService } from '../services/carrito/carrito.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  MEDIA_PATH=MEDIA_PATH
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  productos_destacados:Producto[] = []
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  responsiveOptions: any[] | undefined;
  constructor(
	private xLevel: ProductoService,
	private cart:CarritoService,
	private api:ApiService
				
	){
    
  }

 ngOnInit(){
	// this.productos_destacados =[
	// 	{
	// 		id:1,
	// 		codigo_principal:'ABCD000',
	// 		nombre:'Bolso Billetera Guess Cuero PU Saffiano',
	// 		precio:54.99,
	// 		tags:['Accesorios','Bolsos'],
	// 		imageURL:'0002_GUWBSSABE_3_1800x1800.jpg',
	// 		favorite:false,
	// 		stars:0,
	// 		stock:5,
	// 		bodega:'XLevel Bodega',
	// 		estado:'activo',
	// 		categoria:'Accesorio'
	// 	},
	// 	{
	// 	id:2,
	// 	codigo_principal:'ABCD001',
	// 	nombre:'Estuche Guess Saffiano Logo Metal iPhone 13 Serie',
	// 	precio:49.99,
	// 	tags:['Accesorios','iPhone', 'iPhone 13' ],
	// 	imageURL:'0001_GUHCP13MPSASBPI_4_1800x1800.jpg',
	// 	favorite:false,
	// 	stars:0,
	// 	stock:5,
	// 	bodega:'XLevel Bodega',
	// 	estado:'activo',
	// 	categoria:'Accesorio'
	// 	}
	// ]

	this.api.getProducts().subscribe(
		data=>{
			this.productos_destacados=data
			console.log(this.productos_destacados)
		}
	)

   this.responsiveOptions = [
		{
			breakpoint: '1199px',
			numVisible: 1,
			numScroll: 1
		},
		{
			breakpoint: '991px',
			numVisible: 2,
			numScroll: 1
		},
		{
			breakpoint: '767px',
			numVisible: 1,
			numScroll: 1
		}
	];
  }


  
  getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
			default:
					return '';
        }
    }
}
