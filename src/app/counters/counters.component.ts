import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Counter } from '../models/counter';
import { CounterService } from '../services/counter.service';


@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html'
})
export class CountersComponent implements OnInit {

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
    this.counterService.getCounters()
    .subscribe(data => this.counters = data);
  }

  createCounter(): void {
    this.counterService.createCounter('test')
    .subscribe(data => {
      console.log(data);
      this.counters.push(data);
    });
    console.log(this.counters);
  }

  deleteCounter(counter: Counter): void {
    this.counterService.deleteCounter(counter.id)
    .subscribe(data => {
      console.log(data);
      this.counters.splice(this.counters.indexOf(counter), 1);
    });
  }


  ngOnInit() {
  }

}
