import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MonthService } from '../services/month.service';
import { Month } from '../models/month';
import { ActivatedRoute } from '@angular/router';
import { TariffGroup } from '../models/tariff-group';
import { TariffGroupService } from '../services/tariff-group.service';
import { Counter } from '../models/counter';
import { GroupCostPerMonth } from '../models/group-cost-per-month';
import { CounterService } from '../services/counter.service';
import { GroupCostPerMonthService } from '../services/group-cost-per-month.service';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html'
})
export class ConsumptionComponent implements OnInit {

  public months: Month[] = [];
  public tariffGroups: TariffGroup[] = [];
  public counters: Counter[] = [];
  public groupCostPerMonths: GroupCostPerMonth[] = [];

  constructor(
    private monthService: MonthService,
    private tariffGroupService: TariffGroupService,
    private counterService: CounterService,
    private groupCostPerMonthService: GroupCostPerMonthService,
    private route: ActivatedRoute
  ) {
    this.monthService.getMonths()
    .subscribe(data => this.months = data);

    this.tariffGroupService.getTariffGroups()
    .subscribe(data => this.tariffGroups = data);

    this.counterService.getCounters()
    .subscribe(data => this.counters = data);

    this.groupCostPerMonthService.getGroupCostPerMonths()
    .subscribe(data => this.groupCostPerMonths = data);
   }

  ngOnInit() {}

  public addConsumption(form: NgForm): void {
    console.log(form.value);
  }

}
