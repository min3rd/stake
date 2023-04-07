import { TradingRoomResolver } from './trading.resolver';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradingComponent } from './trading.component';

const routes: Routes = [
  {
    path: '',
    component: TradingComponent,
    resolve: {
      TradingRoomResolver: TradingRoomResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingRoutingModule { }
