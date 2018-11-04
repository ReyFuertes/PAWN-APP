import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { GenericService } from './generic.service';

@Injectable()
export class DashboardService extends GenericService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getDashboardReports(): Observable<any> {
    return this.get('dashboard/getDashboardReports', {});
  }


}
