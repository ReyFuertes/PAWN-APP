import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'core-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {
  @Input()
  public parentForm: FormGroup;
  @Input()
  public controlName: any;
  @Input()
  public autofocus: boolean = false;
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