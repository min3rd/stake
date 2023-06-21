import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyProfitsRoutingModule } from './monthly-profits-routing.module';
import { MonthlyProfitsListComponent } from './monthly-profits-list/monthly-profits-list.component';


@NgModule({
  declarations: [
    MonthlyProfitsListComponent
  ],
  imports: [
    CommonModule,
    MonthlyProfitsRoutingModule
  ]
})
export class MonthlyProfitsModule { }
