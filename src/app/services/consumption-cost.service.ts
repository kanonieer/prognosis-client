import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { api } from './../shared/apiAdress';
import { handleError } from './../shared/handleError';
import { ConsumptionCost } from '../models/consumption-cost';

@Injectable()
export class ConsumptionCostService {

  constructor(private http: Http) {}

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});

  public getConsumptionCost() {
    return this.http.get(api + 'consumptionCosts/', this.options)
    .map((response: Response) => response.json())
    .catch(handleError);
  }
}
