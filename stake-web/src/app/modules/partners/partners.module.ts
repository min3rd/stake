import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners/partners.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    declarations: [
        PartnersComponent
    ],
    imports: [
        CommonModule,
        PartnersRoutingModule,
        SharedModule,
        MatIconModule,
    ]
})
export class PartnersModule { }
