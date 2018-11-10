import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintEntity } from '../../models/print-entity.model';
import { PrintParams } from '../../models/print.model';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss']
})
export class PrintPageComponent implements OnInit {
  public printEntity = PrintEntity;
  public entity: PrintEntity;
  public printParams: PrintParams;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entity = params['printEntity'];
      this.printParams = {
        from: params['printFrom'],
        to: params['printTo']
      };
    })
  }
}
