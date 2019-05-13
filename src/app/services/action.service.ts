import { Observable, ReplaySubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ActionService {
  aeMode$: Observable<any>;
  private _setEAMode: ReplaySubject<any> = new ReplaySubject();

  constructor() {
    this.aeMode$ = this._setEAMode.asObservable();
  }

  public setEntity(entity) {
    this._setEAMode.next(entity);
  }
}