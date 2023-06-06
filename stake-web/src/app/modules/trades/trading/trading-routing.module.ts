import { FirstTradingRoomsResolver, TradingRoomResolver, TradingRoomsResolver } from './trading.resolver';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradingComponent } from './trading.component';
import { TradingGuard } from './trading.guard';

const routes: Routes = [
    {
        path: '',
        component: TradingComponent,
        resolve: {
            FirstTradingRoomsResolver: FirstTradingRoomsResolver,
        },
        canDeactivate: [TradingGuard],
    },
    {
        path: ':symbol',
        component: TradingComponent,
        resolve: {
            TradingRoomsResolver: TradingRoomsResolver,
            TradingRoomResolver: TradingRoomResolver,
        },
        canDeactivate: [TradingGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingRoutingModule { }
