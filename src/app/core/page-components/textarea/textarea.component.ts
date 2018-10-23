import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'core-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})

export class TextareaComponent implements OnInit {
  @Input()
  public parentForm: FormGroup;
  @Input()
  public controlName: any;
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