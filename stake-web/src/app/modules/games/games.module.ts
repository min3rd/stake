import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { LandingComponent } from './landing/landing.component';
import { MinesComponent } from './mines/mines.component';


@NgModule({
  declarations: [
    LandingComponent,
    MinesComponent,
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
