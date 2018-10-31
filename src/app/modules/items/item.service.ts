import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Account } from '../../models/account.model';
import { GenericService } from '../../services/generic.service';
import { PageVar } from '../../models/pages.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ItemService extends GenericService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getOne(id: string): Observable<any> {
    return this.get('item', {id});
  }

  public getItems(pageVar: PageVar): Observable<any> {
    return this.paginate('items/list', pageVar);
  }
}