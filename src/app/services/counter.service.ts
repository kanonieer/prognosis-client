import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { api } from './../shared/apiAdress';
import { handleError } from './../shared/handleError';

@Injectable()
export class CounterService {

  public counters$ = new BehaviorSubject([]);

  constructor( private http: Http) {
    this.getCounters().subscribe(data => {
      this.counters$.next(data);
      console.log(data);
    });
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});

  public getCounters(): Observable<any> {
    return this.http.get(api + 'counters/', this.options)
    .map((response: Response) => response.json())
    .catch(handleError);
  }

  public createCounter(counterTitle: String): Observable<any> {
    const payload = { title: counterTitle };
    return this.http.post(api + 'counters/', JSON.stringify(payload), this.options)
    .map((response: Response) => response.json())
    .catch(handleError);
  }

  public deleteCounter(counterId: Number): Observable<any> {
    return this.http.delete(api + 'counters/' + counterId, this.options)
    .map((response: Response) => response.json())
    .catch(handleError);
  }
}
