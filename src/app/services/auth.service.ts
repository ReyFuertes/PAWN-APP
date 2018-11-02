import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { GenericService } from './generic.service';
import { UserLogin } from '../models/user.model';

@Injectable()
export class LoginService extends GenericService {

  constructor(http: HttpClient) {
    super(http);
  }

  public login(userLogin: UserLogin): Observable<any> {
    return this.post('auth/login', userLogin);
  }


}
