import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from '../../services/generic.service';
import { PageVar } from '../../models/pages.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Renewal } from '../../models/renewal.model';
import { PrintParams } from '../../models/print.model';

@Injectable()
export class RenewalService extends GenericService {

  constructor(http: HttpClient) {
    super(http);
  }

  public printRenewals(printParams: PrintParams): Observable<any> {
    return this.get('renewals/print', printParams);
  }

  public getTypes(): Observable<any> {
    return this.get('renewal/getTypes', {});
  }

  public getOne(id: string): Observable<any> {
    return this.get('renewal', {id});
  }

  public getRenewals(pageVar: PageVar): Observable<any> {
    return this.paginate('renewal/list', pageVar);
  }

  public searchRenewal(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.search(term));
  }

  private search(searchTerm: string): Observable<any> {
    return this.get('renewal/search', {term: searchTerm});
  }


  public saveRenewal(renewal: Renewal): Observable<any> {
    return this.post('renewal/new', renewal);
  }

  public updateRenewal(id: string, renewal: Renewal): Observable<any> {
    return this.update(`renewal/update/${id}`, renewal);
  }

  public editRenewal(id: number): Observable<any> {
    return this.edit('renewal/edit', id.toString());
  }

  public deleteRenewal(id: number): Observable<any> {
    return this.delete(`renewal/delete/${id.toString()}`);
  }
}
