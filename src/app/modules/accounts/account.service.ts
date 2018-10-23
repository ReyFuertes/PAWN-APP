import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../../models/account.model';
import { GenericService } from '../../services/generic.service';
import { PageVar } from '../../models/pages.model';

@Injectable()
export class AccountService extends GenericService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getAccounts(pageVar: PageVar): Observable<any> {
    return this.paginate('accounts/list', pageVar);
  }

  public saveAccount(account: Account): Observable<any> {
    return this.post('accounts/new', account);
  }

  public editAccount(id: number): Observable<any> {
    return this.edit('account/edit', id.toString());
  }

  public deleteAccount(id: number): Observable<any> {
    return this.delete(`account/delete/${id.toString()}`);
  }
}