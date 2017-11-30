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
import { ConsumptionCostService } from '../services/consumption-cost.service';

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
  public showTab: Boolean = true;

  constructor(
    private monthService: MonthService,
    private tariffGroupService: TariffGroupService,
    private counterService: CounterService,
    private groupCostPerMonthService: GroupCostPerMonthService,
    private consumptionService: ConsumptionService,
    private consumptionCostService: ConsumptionCostService
  ) {
    this.fetchData();
   }

  ngOnInit() {
  }

  private fetchData() {
    this.monthService.getMonths()
    .subscribe(months => this.months = months);

    this.tariffGroupService.getTariffGroups()
    .subscribe(tariffGroups => this.tariffGroups = tariffGroups);

    this.counterService.getCounters()
    .subscribe(counters => this.counters = counters);

    this.groupCostPerMonthService.getGroupCostPerMonths()
    .subscribe(groupCostPerMonths => this.groupCostPerMonths = groupCostPerMonths);

    this.consumptionService.getConsumptions()
    .subscribe(consumptions => this.consumptions = consumptions);

    this.consumptionCostService.getConsumptionCost()
    .subscribe(consumptionCosts => this.consumptionCosts = consumptionCosts);
  }

  public getCostForCounters(form: NgForm) {
    const monthId = Number(form.value.month);
    const countersIds = form.value.counters;
    let fullCost = 0;
    const errors: String[] = [];

    Object.entries(countersIds).forEach((counter) => {
      const [key, value] = counter;

      if (value) {
        const counterId = Number(key);

        const consumptionCost =
        this.findByCounterAndMonth(this.consumptionCosts, counterId, monthId);

        if (consumptionCost) {
          const costEvaluationSchema =
          this.getGroupEvaluationSchema(this.tariffGroups, consumptionCost.tariffGroupId);

          if (this.isSchemaSafe(costEvaluationSchema)) {
            fullCost += this.evaluateCost(costEvaluationSchema, consumptionCost.cost, consumptionCost.value);
          }
        } else {
            errors.push(this.findCounterById(counterId).title);
        }

      }
  });
    console.log(`Koszt ${fullCost}`);
    console.log(errors);
  }

  public getCostForTariffGroups(form: NgForm) {
    const monthId = Number(form.value.month);
    const tariffGroupIds = form.value.tariffGroups;
    console.log(tariffGroupIds);
    let fullCost = 0;

    Object.entries(tariffGroupIds).forEach((tariffGroup) => {
      const [key, value] = tariffGroup;

      if (value) {
        const tariffGroupId = Number(key);

        const consumptionCostFiltered
        = this.findAllByTariffGroupAndMonth(this.consumptionCosts, tariffGroupId, monthId);

        const evaluationSchema =
        this.getGroupEvaluationSchema(this.tariffGroups, tariffGroupId);

        if (this.isSchemaSafe(evaluationSchema)) {
          consumptionCostFiltered.forEach(item => {
            fullCost += this.evaluateCost(evaluationSchema, item.cost, item.value);
          });
        }
      }
      console.log(`Koszt częsciowy: ${fullCost}`);
    });
    console.log(`Koszt całkowity: ${fullCost}`);
  }

  private getGroupEvaluationSchema(
    array: Array<TariffGroup>,
    tariffGroupId: Number
  ): String {
    return array.find(item => item.id === tariffGroupId).calc;
  }

  private findCounterById(id: Number) {
    return this.counters.find(item => item.id === id);
  }

  private findByCounterAndMonth(
    array: Array<ConsumptionCost>,
    counterId: Number,
    monthId: Number
  ) {
    return array.find(item =>
      item.counterId === counterId && item.monthId === monthId);
  }

  private findAllByTariffGroupAndMonth(
    array: Array<ConsumptionCost>,
    tariffGroupId: Number,
    monthId: Number
  ) {
    return array.filter(item =>
      item.tariffGroupId === tariffGroupId && item.monthId === monthId);
  }

  private evaluateCost(
    evaluationSchema: String,
    cost: Number,
    consumption: Number
  ): number {
    return Parser.evaluate(evaluationSchema, {'CENA': cost, 'ZUZYCIE': consumption});
  }

  private isSchemaSafe(evaluationSchema): Boolean {
    return true;
  }

  public toggleTab() {
    this.showTab = !this.showTab;
  }
}
