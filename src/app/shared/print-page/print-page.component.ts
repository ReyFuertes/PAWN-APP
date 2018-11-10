import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintEntity } from '../../models/print-entity.model';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss']
})
export class PrintPageComponent implements OnInit {
  public printEntity = PrintEntity;
  public entity: PrintEntity;
  public printFrom: string;
  public printTo: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entity = params['printEntity'];
      this.printFrom = params['printValues'];
      this.printTo = params['printTo'];
    })
  }
}
