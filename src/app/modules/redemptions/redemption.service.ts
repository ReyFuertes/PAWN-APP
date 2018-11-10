import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from '../../services/generic.service';
import { PageVar } from '../../models/pages.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Redemption } from '../../models/redemption.mode';
import { PrintParams } from '../../models/print.model';

@Injectable()
export class RedemptionService extends GenericService {

  constructor(http: HttpClient) {
    super(http);
  }

  public printRedemptions(printParams: PrintParams): Observable<any> {
    return this.get('redemptions/print', printParams);
  }

  public getTypes(): Observable<any> {
    return this.get('redemption/getTypes', {});
  }

  public getOne(id: string): Observable<any> {
    return this.get('redemption', {id});
  }

  public getRedemptions(pageVar: PageVar): Observable<any> {
    return this.paginate('redemption/list', pageVar);
  }

  public searchRedemption(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.search(term));
  }

  private search(searchTerm: string): Observable<any> {
    return this.get('redemption/search', {term: searchTerm});
  }


  public saveRedemption(redemption: Redemption): Observable<any> {
    return this.post('redemption/new', redemption);
  }

  public updateRedemption(id: string, redemption: Redemption): Observable<any> {
    return this.update(`redemption/update/${id}`, redemption);
  }

  public editRedemption(id: number): Observable<any> {
    return this.edit('redemption/edit', id.toString());
  }

  public deleteRedemption(id: number): Observable<any> {
    return this.delete(`redemption/delete/${id.toString()}`);
  }
}
