import { Component, OnInit } from '@angular/core';
import { TariffGroup } from '../models/tariff-group';
import { CounterService } from '../services/counter.service';
import { TariffGroupService } from '../services/tariff-group.service';

@Component({
  selector: 'app-tariff-groups',
  templateUrl: './tariff-groups.component.html'
})
export class TariffGroupsComponent implements OnInit {

  public tariffGroups: TariffGroup[] = [
    // {
    //   id: 1,
    //   name: 'A',
    //   calc: '(0.3 * ZUZYCIE + 50) * CENA'
    // },
    // {
    //   id: 2,
    //   name: 'B',
    //   calc: '(ZUZYCIE+5)*0.7 * CENA'
    // },
    // {
    //   id: 3,
    //   name: 'C',
    //   calc: 'ZUZYCIE*2 / 2.3 * CENA'
    // },
    // {
    //   id: 4,
    //   name: 'D',
    //   calc: 'ZUZYCIE+50 - ZUZYCIE / 1.65 * CENA'
    // },
    // {
    //   id: 5,
    //   name: 'E',
    //   calc: '0.8*ZUZYCIE+( ZUZYCIE / 4) * CENA'
    // }
  ];
  
  constructor(private tariffGroupService: TariffGroupService) {
    this.tariffGroupService.getTariffGroups()
    .subscribe(data => this.tariffGroups = data);
  }

  ngOnInit() {
  }

}
