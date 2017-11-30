import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { api } from './../shared/apiAdress';
import { handleError } from './../shared/handleError';

@Injectable()
export class TariffGroupService {

  public tariffGroups$ = new BehaviorSubject([]);

  constructor( private http: Http) {
    this.getTariffGroups().subscribe(data => {
      this.tariffGroups$.next(data);
      console.log(data);
    });
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});

  public getTariffGroups(): Observable<any> {
    return this.http.get(api + 'tariffGroups/', this.options)
    .map((response: Response) => response.json())
    .catch(handleError);
  }
}
