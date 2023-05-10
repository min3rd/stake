import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing/landing.component';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        LandingComponent
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        FuseAlertModule,
        SharedModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
    ]
})
export class LandingModule { }
