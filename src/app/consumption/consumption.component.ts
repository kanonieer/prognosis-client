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

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html'
})
export class ConsumptionComponent implements OnInit {

  public months: Month[] = [];
  public tariffGroups: TariffGroup[] = [];
  public counters: Counter[] = [];
  public groupCostPerMonths: GroupCostPerMonth[] = [];
  public groupCostPerMonth: GroupCostPerMonth;

  constructor(
    private monthService: MonthService,
    private tariffGroupService: TariffGroupService,
    private counterService: CounterService,
    private groupCostPerMonthService: GroupCostPerMonthService,
    private consumptionService: ConsumptionService,
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
    const monthId = Number(form.value.month);
    const tariffGroupId = Number(form.value.tariffGroup);
    const counter = Number(form.value.counter);
    const consumptionValue = form.value.consumptionValue;
    const cost = form.value.cost;

    console.log(form.value);
    if (cost) {
      const payloadForCost = { tariffGroupId, cost, monthId };

      this.groupCostPerMonthService.createGroupCostPerMonth(payloadForCost)
      .subscribe(groupCostData => {
        console.log(groupCostData);
        const payloadForConsumption = {
          groupCostPerMonthId: groupCostData.id,
          counterId: counter,
          value: consumptionValue
        };

        this.consumptionService.createConsumption(payloadForConsumption)
        .subscribe(data => console.log(data));
      });
    } else {
      const payloadForConsumption = {
        groupCostPerMonthId: this.groupCostPerMonth.id,
        counterId: counter,
        value: consumptionValue
      };

      this.consumptionService.createConsumption(payloadForConsumption)
      .subscribe(data => console.log(data));
    }

    form.reset();
  }

  public hasGroupCostPerMonth(monthId, tariffGroupId) {
    if (monthId !== '' && tariffGroupId !== '') {
      return !!!this.getGroupCostPerMonth(monthId, tariffGroupId);
    } else {
      return false;
    }
  }

  private getGroupCostPerMonth(monthId, tariffGroupId): GroupCostPerMonth | any {
    const filteredGroups = this.groupCostPerMonths.filter(groupCostPerMonth => {
      return (groupCostPerMonth.monthId.toString() === monthId)
      && (groupCostPerMonth.tariffGroupId.toString() === tariffGroupId);
    });

    if (filteredGroups.length) {
      this.groupCostPerMonth = filteredGroups[0];
      return filteredGroups[0];
    } else {
      return false;
    }
  }
}
