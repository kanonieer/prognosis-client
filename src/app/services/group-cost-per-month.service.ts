import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { api } from './../shared/apiAdress';
import { handleError } from './../shared/handleError';

@Injectable()
export class GroupCostPerMonthService {

  constructor( private http: Http) {}

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});

  public getGroupCostPerMonths(): Observable<any> {
    return this.http.get(api + 'groupCostPerMonths/', this.options)
    .map((response: Response) => response.json())
    .catch(handleError);
  }

  public createGroupCostPerMonth(payload): Observable<any> {
    return this.http.post(api + 'groupCostPerMonths/', JSON.stringify(payload), this.options)
    .map((response: Response) => response.json())
    .catch(handleError);
  }
}
