import { Component, OnInit } from '@angular/core';
import { Counter } from '../models/counter';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html'
})
export class CountersComponent implements OnInit {

  public counters: Counter[] = [
    {
      id: 1,
      tariff_group_id: 1,
      name: 'Łazienka 1'
    },
    {
      id: 2,
      tariff_group_id: 2,
      name: 'Kuchnia'
    },
    {
      id: 3,
      tariff_group_id: 1,
      name: 'Łazienka 2'
    },
    {
      id: 4,
      tariff_group_id: 3,
      name: 'Salon'
    },    {
      id: 5,
      tariff_group_id: 4,
      name: 'Sypialnia'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
