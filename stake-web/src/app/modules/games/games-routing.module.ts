import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MinesComponent } from './mines/mines.component';
import { MinesRoundResolver, MinesRoundsResolver } from './mines/mines.resolver';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'mines',
    component: MinesComponent,
    resolve: {
      MinesRoundsResolver: MinesRoundsResolver,
    }
  },
  {
    path: 'mines/:id',
    canMatch: [AuthGuard],
    component: MinesComponent,
    resolve: {
      MinesRoundResolver: MinesRoundResolver,
      MinesRoundsResolver: MinesRoundsResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
