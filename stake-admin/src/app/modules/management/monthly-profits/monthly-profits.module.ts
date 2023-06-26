import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyProfitsRoutingModule } from './monthly-profits-routing.module';
import { MonthlyProfitsListComponent } from './monthly-profits-list/monthly-profits-list.component';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { MonthlyProfitsDetailComponent } from './monthly-profits-detail/monthly-profits-detail.component';
import { FuseConfirmationModule } from '@fuse/services/confirmation';

@NgModule({
    declarations: [
        MonthlyProfitsListComponent,
        MonthlyProfitsDetailComponent
    ],
    imports: [
        CommonModule,
        MonthlyProfitsRoutingModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        SharedModule,
        FuseConfirmationModule,
    ]
})
export class MonthlyProfitsModule { }
