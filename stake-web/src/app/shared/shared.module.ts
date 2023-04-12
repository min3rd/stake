import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'app/core/pipe/pipe.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        TranslocoCoreModule,
        QRCodeModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        TranslocoCoreModule,
        QRCodeModule,
    ]
})
export class SharedModule {
}
