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
  public showCostModal: Boolean = false;
  public costSummary: any = {
    valid: [],
    errors: [],
    totalCost: 0
  };

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
    let totalCost = 0;
    const errors: String[] = [];
    const valid: any[] = [];


    Object.entries(countersIds).forEach((counter) => {
      const [key, value] = counter;

      if (value) {
        const counterId = Number(key);
        const counterTitle = this.findById(this.counters, counterId).title;

        const consumptionCost =
        this.findByCounterAndMonth(this.consumptionCosts, counterId, monthId);

        if (consumptionCost) {
          const costEvaluationSchema =
          this.getGroupEvaluationSchema(this.tariffGroups, consumptionCost.tariffGroupId);

          if (this.isSchemaSafe(costEvaluationSchema)) {
            const counterCost = this.evaluateCost(costEvaluationSchema, consumptionCost.cost, consumptionCost.value);
            valid.push({counterTitle, counterCost});
            totalCost += counterCost;
          }
        } else {
            errors.push(counterTitle);
        }

      }
  });

    this.costSummary = {valid, errors, totalCost};
    this.toggleCostModal();
  }

  public getCostForTariffGroups(form: NgForm) {
    const monthId = Number(form.value.month);
    const tariffGroupIds = form.value.tariffGroups;

    let totalCost = 0;
    const errors: String[] = [];
    const valid: any[] = [];


    Object.entries(tariffGroupIds).forEach((tariffGroup) => {
      const [key, value] = tariffGroup;

      if (value) {
        const tariffGroupId = Number(key);
        const tariffGroupTitle = this.findById(this.tariffGroups, tariffGroupId).title;

        const consumptionCostFiltered
        = this.findAllByTariffGroupAndMonth(this.consumptionCosts, tariffGroupId, monthId);

        const evaluationSchema =
        this.getGroupEvaluationSchema(this.tariffGroups, tariffGroupId);

        if (this.isSchemaSafe(evaluationSchema)) {
          let tariffGroupCost = 0;
          consumptionCostFiltered.forEach(item => {
            tariffGroupCost += this.evaluateCost(evaluationSchema, item.cost, item.value);
          });
          valid.push({tariffGroupTitle, tariffGroupCost});
          totalCost += tariffGroupCost;
        } else {
          errors.push(tariffGroupTitle);
        }
      }
    });

    this.costSummary = {valid, errors, totalCost};
    this.toggleCostModal();
  }

  private getGroupEvaluationSchema(
    array: Array<TariffGroup>,
    tariffGroupId: Number
  ): String {
    return array.find(item => item.id === tariffGroupId).calc;
  }

  private findById(array: Array<any>, id: Number) {
    return array.find(item => item.id === id);
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
    const pattern = RegExp('(^)([ \+\-\/\*\.0-9\(\)]|CENA|ZUZYCIE)+($)');

    return pattern.test(evaluationSchema);
  }

  public isMonthSelected(monthId): Boolean {
    return monthId !== '' && monthId !== undefined && monthId !== null;
  }

  public toggleTab() {
    this.showTab = !this.showTab;
  }

  public toggleCostModal() {
    this.showCostModal = !this.showCostModal;
    if (!this.showCostModal) {
      this.fetchData();
    }
  }
}
