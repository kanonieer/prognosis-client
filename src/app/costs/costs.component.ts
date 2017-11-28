import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { MonthService } from '../services/month.service';
import { Month } from '../models/month';
import { ActivatedRoute } from '@angular/router';
import { TariffGroup } from '../models/tariff-group';
import { TariffGroupService } from '../services/tariff-group.service';
import { Counter } from '../models/counter';
import { GroupCostPerMonth } from '../models/group-cost-per-month';
import { CounterService } from '../services/counter.service';
import { GroupCostPerMonthService } from '../services/group-cost-per-month.service';
import { ConsumptionService } from '../services/consumption.service';
import { Parser } from 'expr-eval';
import { ConsumptionCost } from '../models/consumption-cost';
import { Consumption } from '../models/consumption';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html'
})
export class CostsComponent implements OnInit {

  public months: Month[] = [];
  public tariffGroups: TariffGroup[] = [];
  public counters: Counter[] = [];
  public groupCostPerMonths: GroupCostPerMonth[] = [];
  public consumptions: Consumption[] = [];
  public consumptionCosts: ConsumptionCost[] = [];

  constructor(
    private monthService: MonthService,
    private tariffGroupService: TariffGroupService,
    private counterService: CounterService,
    private groupCostPerMonthService: GroupCostPerMonthService,
    private consumptionService: ConsumptionService
  ) {
    this.monthService.getMonths()
    .subscribe(data => this.months = data);

    this.tariffGroupService.getTariffGroups()
    .subscribe(data => this.tariffGroups = data);

    this.counterService.getCounters()
    .subscribe(data => this.counters = data);

    this.groupCostPerMonthService.getGroupCostPerMonths()
    .subscribe(data => this.groupCostPerMonths = data);

    this.consumptionService.getConsumptions()
    .subscribe(data => {
      this.consumptions = data;
      this.consumptionCosts = _.map(this.consumptions, (item) => {
        return _.assign(item, _.find(this.groupCostPerMonths, [ 'id', item.groupCostPerMonthId ]));
      });
      console.log(this.consumptions);
      console.log(this.groupCostPerMonths);
      console.log(this.consumptionCosts);
    });

    console.log(Parser.evaluate('2 ^ x', { x: 3 }));
   }

  ngOnInit() {
  }

  public getCost(form: NgForm) {
    const monthId = Number(form.value.month);
    const tariffGroupId = Number(form.value.tariffGroup);
    const counterId = Number(form.value.counter);

    console.log(monthId, counterId);
    const consumptionCost =
    this.consumptionCosts.find(item => item.counterId === counterId && item.monthId === monthId);

    const tariffGroup = this.tariffGroups.find(item => item.id === tariffGroupId);

    console.log(consumptionCost);
    console.log(tariffGroup.calc);
    const value = Parser.evaluate(tariffGroup.calc, {
      'ZUZYCIE': consumptionCost.value,
      'CENA': consumptionCost.cost
    });

    console.log(value);
  }
}
