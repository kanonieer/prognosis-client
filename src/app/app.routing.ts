import { RouterModule, Router } from '@angular/router';
import { CountersComponent } from './counters/counters.component';
import { CostsComponent } from './costs/costs.component';
import { TariffGroupsComponent } from './tariff-groups/tariff-groups.component';
import { HomeComponent } from './home/home.component';

export const routing = RouterModule.forRoot([
    { path: '', component: HomeComponent,  pathMatch: 'full' },
    { path: 'counters', component: CountersComponent },
    { path: 'costs', component: CostsComponent },
    { path: 'tariff-groups', component: TariffGroupsComponent }
]);
