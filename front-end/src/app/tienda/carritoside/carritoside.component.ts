import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carritoside',
  templateUrl: './carritoside.component.html',
  styleUrls: ['./carritoside.component.scss']
})
export class CarritosideComponent {
  constructor(private offcanvasService:NgbOffcanvas){

  }
  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}
    
}
