import { Component } from '@angular/core';

@Component({
  selector: 'app-nav1',
  templateUrl: './nav1.component.html',
  styleUrls: ['./nav1.component.scss']
})
export class Nav1Component {
  header_0 ='Delivery gratuito por compras superiores a $50 en todos los productos';
  header_0_enable =true;
  header_1_enable =true;
  //Implementar llamada a la api para obtener el mensaje a mostrar
}
