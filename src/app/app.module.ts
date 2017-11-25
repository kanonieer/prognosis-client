import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CountersComponent } from './counters/counters.component';
import { TariffGroupsComponent } from './tariff-groups/tariff-groups.component';
import { CostsComponent } from './costs/costs.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
