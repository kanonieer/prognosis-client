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
import { ConsumptionService } from '../services/consumption.service';
import { ConsumptionCostService } from '../services/consumption-cost.service';
import { ConsumptionCost } from '../models/consumption-cost';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html'
})
export class ConsumptionComponent implements OnInit {

  public months: Month[] = [];
  public tariffGroups: TariffGroup[] = [];
  public counters: Counter[] = [];
  public groupCostPerMonths: GroupCostPerMonth[] = [];
  public consumptionCosts: ConsumptionCost[] = [];

  constructor(
    private monthService: MonthService,
    private tariffGroupService: TariffGroupService,
    private counterService: CounterService,
    private groupCostPerMonthService: GroupCostPerMonthService,
    private consumptionService: ConsumptionService,
    private consumptionCostService: ConsumptionCostService,
    private route: ActivatedRoute
  ) {
    this.fetchData();
   }

  ngOnInit() {}

  private fetchData() {
    this.monthService.getMonths()
    .subscribe(months => this.months = months);

    this.tariffGroupService.getTariffGroups()
    .subscribe(tariffGroups => this.tariffGroups = tariffGroups);

    this.groupCostPerMonthService.getGroupCostPerMonths()
    .subscribe(groupCostPerMonths => this.groupCostPerMonths = groupCostPerMonths);

    this.counterService.getCounters()
    .subscribe(counters => this.counters = counters);

    this.consumptionCostService.getConsumptionCost()
    .subscribe(consumptionCosts => this.consumptionCosts = consumptionCosts);
  }

  public addConsumption(form: NgForm): void {
    const monthId = Number(form.value.month);
    const tariffGroupId = Number(form.value.tariffGroup);
    const counterId = Number(form.value.counter);
    const value = form.value.value;
    const cost = form.value.cost;

    console.log(form.value);
    if (cost) {
      const payloadForCost = { tariffGroupId, cost, monthId };

      this.groupCostPerMonthService.createGroupCostPerMonth(payloadForCost)
      .subscribe(newGroupCostPerMonth => {
        console.log(newGroupCostPerMonth);
        const groupCostPerMonthId = newGroupCostPerMonth.id;

        this.registerConsumption(groupCostPerMonthId, counterId, value);
      });
    } else {
      const groupCostPerMonthId = this.getGroupCostPerMonthId(monthId, tariffGroupId);

      this.registerConsumption(groupCostPerMonthId, counterId, value);
    }

    form.reset();
  }

  public hasGroupAssignedCost(monthId, tariffGroupId): Boolean {
    if (this.valuesAreSelected(monthId, tariffGroupId)) {
      console.log(`Month ${monthId}, tariffGroup ${tariffGroupId}`);
      return !!this.groupCostPerMonths.find(item =>
        item.monthId.toString() === monthId && item.tariffGroupId.toString() === tariffGroupId);
    }

    return true;
  }

  public hasAssignedGroupInMonth(monthId, counterId): Boolean {
    if (this.valuesAreSelected(monthId, counterId)) {
      return !!this.consumptionCosts.find(item =>
        item.monthId.toString() === monthId && item.counterId.toString() === counterId);
    }

    return true;
  }

  public valuesAreSelected(value1, value2): Boolean {
    return value1 !== '' && value1 !== undefined && value1 !== null
    && value2 !== '' && value2 !== undefined && value2 !== null;
  }

  private getGroupCostPerMonthId(monthId, tariffGroupId) {
    return this.groupCostPerMonths.find(item =>
      item.monthId === monthId && item.tariffGroupId === tariffGroupId);

  }

  private registerConsumption(groupCostPerMonthId, counterId, value) {
    const payloadForConsumption = { groupCostPerMonthId, counterId, value };

    this.consumptionService.createConsumption(payloadForConsumption)
    .subscribe(data => console.log(data));

    this.fetchData();
  }
}
