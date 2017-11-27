import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MonthService } from '../services/month.service';
import { Month } from '../models/month';

@Injectable()
export class MonthResolver implements Resolve<Month[]> {

  constructor(
    private router: Router,
    private monthService: MonthService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.monthService.getMonths().map(item => {
        return { id: item.id, month: item.month };
      });
  }
}
