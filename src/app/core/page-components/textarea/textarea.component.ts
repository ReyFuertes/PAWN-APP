import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'core-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})

export class TextareaComponent implements OnInit {
  @Input()
  public rows: number = 5;
  @Input()
  public textareaStyle: string = '';
  @Input()
  public placeholder: string = 'Enter Keyword';
  @Input()
  public label: string = 'Your Label';
  @Input()
  public name: string = 'Name';

  constructor() { }

  ngOnInit() { }
}