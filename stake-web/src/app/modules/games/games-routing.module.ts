import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MinesComponent } from './mines/mines.component';
import { MinesRoundResolver } from './mines/mines.resolver';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'mines',
    component: MinesComponent,
  },
  {
    path: 'mines/:id',
    component: MinesComponent,
    resolve: {
      MinesRoundResolver: MinesRoundResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
