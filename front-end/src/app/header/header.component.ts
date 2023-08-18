import { Nav3Component } from './nav3/nav3.component';
import { Nav2Component } from './nav2/nav2.component';
import { Component, OnInit } from '@angular/core';
// import {logo_xlevel} from '../../assets/images/';

import {
  animate,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger
} from "@angular/animations";

export const DropDownAnimation = trigger("dropDownMenu", [
  transition(":enter", [
    style({ height: 0, overflow: "hidden" }),
    query(".menu-item", [
      style({ opacity: 0, transform: "translateY(-50px)" })
    ]),
    sequence([
      animate("200ms", style({ height: "*" })),
      query(".menu-item", [
        stagger(-50, [
          animate("400ms ease", style({ opacity: 1, transform: "none" }))
        ])
      ])
    ])
  ]),

  transition(":leave", [
    style({ height: "*", overflow: "hidden" }),
    query(".menu-item", [style({ opacity: 1, transform: "none" })]),
    sequence([
      query(".menu-item", [
        stagger(50, [
          animate(
            "400ms ease",
            style({ opacity: 0, transform: "translateY(-50px)" })
          )
        ])
      ]),
      animate("200ms", style({ height: 0 }))
    ])
  ])
]);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    // 'dropDownMenu'
  ]
})

export class HeaderComponent implements OnInit{
  
  logo_xlevel = '../../../assets/images/logoxlevel1.svg';
  
  ngOnInit(): void {
    
  }
}
