import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashComponent } from './cash.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { PipeModule } from 'app/core/pipe/pipe.module';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { LiveNotificationComponent } from './live-notification/live-notification.component';

@NgModule({
    declarations: [
        CashComponent,
        LiveNotificationComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        TranslocoModule,
        PipeModule,
        FuseConfirmationModule,
    ],
    exports: [CashComponent]
})
export class CashModule { }
