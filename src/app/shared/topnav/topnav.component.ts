import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pa-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: [ './topnav.component.scss' ]
})

export class TopnavComponent implements OnInit {
  public loginUser: any;
  constructor() { }

  ngOnInit() { 
    if(localStorage.getItem('u')) {
      this.loginUser = JSON.parse(localStorage.getItem('u')).email;
    }
  }
}