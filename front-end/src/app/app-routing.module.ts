import { PrecompraayudaComponent } from './pages/precompraayuda/precompraayuda.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicioclienteComponent } from './pages/serviciocliente/serviciocliente.component';
import { UbicanosComponent } from './pages/ubicanos/ubicanos.component';
import { PrecompraComponent } from './pages/precompra/precompra.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ProductoComponent } from './tienda/producto/producto.component';
import { CarritoComponent } from './tienda/carrito/carrito.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'tienda',component:TiendaComponent},
  {path:'tienda/producto/:ID_PRODUCTO',component:ProductoComponent},
  {path:'atencion_al_cliente',component:ServicioclienteComponent},
  {path:'ubicanos',component:UbicanosComponent},
  {path:'precompra',component:PrecompraComponent},
  {path:'precompra/ayuda',component:PrecompraayudaComponent},
  {path:'productos',component:ProductosComponent},
  {path:'carrito',component:CarritoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
