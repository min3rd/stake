import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { LuckyCardsComponent } from './lucky-cards/lucky-cards.component';
import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [
    LandingComponent,
    LuckyCardsComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
