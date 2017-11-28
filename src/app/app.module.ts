import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CountersComponent } from './counters/counters.component';
import { TariffGroupsComponent } from './tariff-groups/tariff-groups.component';
import { CostsComponent } from './costs/costs.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { ConsumptionComponent } from './consumption/consumption.component';
import { FormsModule } from '@angular/forms';
import { MonthService } from './services/month.service';
import { HttpModule } from '@angular/http';
import { MonthResolver } from './reslovers/month.resolve';
import { TariffGroupService } from './services/tariff-group.service';
import { GroupCostPerMonthService } from './services/group-cost-per-month.service';
import { CounterService } from './services/counter.service';
import { ConsumptionService } from './services/consumption.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'counters', component: CountersComponent },
  { path: 'costs', component: CostsComponent },
  { path: 'tariff-groups', component: TariffGroupsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CountersComponent,
    TariffGroupsComponent,
    CostsComponent,
    HomeComponent,
    ConsumptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MonthService,
    MonthResolver,
    TariffGroupService,
    GroupCostPerMonthService,
    CounterService,
    ConsumptionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
