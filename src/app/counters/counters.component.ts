import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Counter } from '../models/counter';
import { CounterService } from '../services/counter.service';


@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html'
})
export class CountersComponent implements OnInit {

  public showCreateCounterModal: Boolean = false;
  public counters: Counter[] = [
    // {
    //   id: 1,
    //   tariff_group_id: 1,
    //   name: 'Łazienka 1'
    // },
    // {
    //   id: 2,
    //   tariff_group_id: 2,
    //   name: 'Kuchnia'
    // },
    // {
    //   id: 3,
    //   tariff_group_id: 1,
    //   name: 'Łazienka 2'
    // },
    // {
    //   id: 4,
    //   tariff_group_id: 3,
    //   name: 'Salon'
    // },    {
    //   id: 5,
    //   tariff_group_id: 4,
    //   name: 'Sypialnia'
    // }
  ];

  constructor(private counterService: CounterService) {
    this.counterService.counters$.subscribe(counters =>
    this.counters = counters);
  }

  public createCounter(form: NgForm): void {
    this.counterService.createCounter(form.value.counter)
    .subscribe(data => {
      this.counters.push(data);
      this.toggleCreateCounterModal();
      form.reset()
    });
  }

  public deleteCounter(counter: Counter): void {
    this.counterService.deleteCounter(counter.id)
    .subscribe(data => {
      this.counters.splice(this.counters.indexOf(counter), 1);
    });
  }

  public toggleCreateCounterModal(): void {
    this.showCreateCounterModal = !this.showCreateCounterModal;
  }

  public onModalClose(form: NgForm): void {
    form.reset();
    this.toggleCreateCounterModal();
  }

  ngOnInit() {
  }

}
