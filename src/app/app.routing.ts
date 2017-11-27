import { RouterModule, Router } from '@angular/router';
import { CountersComponent } from './counters/counters.component';
import { CostsComponent } from './costs/costs.component';
import { TariffGroupsComponent } from './tariff-groups/tariff-groups.component';
import { HomeComponent } from './home/home.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { MonthResolver } from './reslovers/month.resolve';

export const routing = RouterModule.forRoot([
    { path: '', component: HomeComponent,  pathMatch: 'full' },
    { path: 'counters', component: CountersComponent },
    { path: 'costs', component: CostsComponent },
    { path: 'tariff-groups', component: TariffGroupsComponent },
    { path: 'consumption', component: ConsumptionComponent, resolve: { months: MonthResolver } }
]);
