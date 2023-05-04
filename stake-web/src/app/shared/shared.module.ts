import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'app/core/pipe/pipe.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { QRCodeModule } from 'angularx-qrcode';
import { ChartModule } from 'angular-highcharts';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        TranslocoCoreModule,
        QRCodeModule,
        ChartModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        TranslocoCoreModule,
        QRCodeModule,
        ChartModule,
    ]
})
export class SharedModule {
}
