import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CountersComponent } from './counters/counters.component';
import { TariffGroupsComponent } from './tariff-groups/tariff-groups.component';
import { CostsComponent } from './costs/costs.component';
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
import { ModalComponent } from './modal/modal.component';
import { ConsumptionCostService } from './services/consumption-cost.service';

@NgModule({
  declarations: [
    AppComponent,
    CountersComponent,
    TariffGroupsComponent,
    CostsComponent,
    ConsumptionComponent,
    ModalComponent
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
    ConsumptionService,
    ConsumptionCostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
