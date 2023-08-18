import { Component } from '@angular/core';
import { NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav3',
  templateUrl: './nav3.component.html',
  styleUrls: ['./nav3.component.scss'],
  // imports: [NgbDropdownMenu]
})
export class Nav3Component {
  logo_xlevel = '../../../assets/images/logoxlevel1.svg';
  categorias=[
    {
      
      nombre:'iPhone',
      link:'#searchlink?',
      icon_svg :'fontello'
    },
    {
      nombre:'iPad',
      link:'#searchanotherlink'
    },
    {
      nombre:'Macbook',
      link:'#searchanotherlink'
    },
    {
      nombre:'AirPods',
      link:'#searchanotherlink'
    },

  ]
  
}
