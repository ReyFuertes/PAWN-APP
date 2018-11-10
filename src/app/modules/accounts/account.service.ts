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
import { PrintParams } from '../../models/print.model';

@Injectable()
export class AccountService extends GenericService {

  constructor(http: HttpClient) {
    super(http);
  }

  public printAccounts(printParams: PrintParams): Observable<any> {
    return this.get('accounts/print', printParams);
  }

  public getOne(id: string): Observable<any> {
    return this.get('account', {id});
  }

  public searchAccount(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.search(term));
  }

  private search(searchTerm: string): Observable<any> {
    return this.get('accounts/search', {term: searchTerm});
  }

  public getAccounts(pageVar: PageVar): Observable<any> {
    return this.paginate('accounts/list', pageVar);
  }

  public saveAccount(account: Account): Observable<any> {
    return this.post('account/new', account);
  }

  public updateAccount(id: string, renewal: Account): Observable<any> {
    return this.update(`account/update/${id}`, renewal);
  }

  public editAccount(id: number): Observable<any> {
    return this.edit('account/edit', id.toString());
  }

  public deleteAccount(id: number): Observable<any> {
    return this.delete(`account/delete/${id.toString()}`);
  }
}