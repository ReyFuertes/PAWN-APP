import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'core-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {
  @Input()
  public inputStyle: string = '';
  @Input()
  public placeholder: string = 'Enter Keyword';
  @Input()
  public label: string = 'Your Label';
  @Input()
  public name: string = 'Name';

  constructor() { }

  ngOnInit() { }
}