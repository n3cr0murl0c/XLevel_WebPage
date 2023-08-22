import { PrecompraayudaComponent } from './pages/precompraayuda/precompraayuda.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicioclienteComponent } from './pages/serviciocliente/serviciocliente.component';
import { UbicanosComponent } from './pages/ubicanos/ubicanos.component';
import { PrecompraComponent } from './pages/precompra/precompra.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { TiendaComponent } from './tienda/tienda.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'tienda',component:TiendaComponent},
  {path:'atencion_al_cliente',component:ServicioclienteComponent},
  {path:'ubicanos',component:UbicanosComponent},
  {path:'precompra',component:PrecompraComponent},
  {path:'precompra/ayuda',component:PrecompraayudaComponent},
  {path:'productos',component:ProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
