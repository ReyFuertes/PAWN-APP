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
import { Item } from '../../models/item.model';

@Injectable()
export class ItemService extends GenericService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getTypes(): Observable<any> {
    return this.get('item/getTypes', {});
  }

  public getOne(id: string): Observable<any> {
    return this.get('item', {id});
  }

  public getItems(pageVar: PageVar): Observable<any> {
    return this.paginate('items/list', pageVar);
  }

  public searchItem(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.search(term));
  }

  private search(searchTerm: string): Observable<any> {
    return this.get('item/search', {term: searchTerm});
  }


  public saveItem(item: Item): Observable<any> {
    return this.post('item/new', item);
  }

  public updateItem(id: string, item: Item): Observable<any> {
    return this.update(`item/update/${id}`, item);
  }

  public editItem(id: number): Observable<any> {
    return this.edit('item/edit', id.toString());
  }

  public deleteItem(id: number): Observable<any> {
    return this.delete(`item/delete/${id.toString()}`);
  }
}
