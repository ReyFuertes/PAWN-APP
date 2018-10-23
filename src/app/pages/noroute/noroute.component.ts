import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noroute',
  templateUrl: './noroute.component.html',
  styleUrls: ['./noroute.component.scss']
})
export class NoRouteComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    console.log('No route..');
   }
}
