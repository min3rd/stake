import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'app/core/pipe/pipe.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        TranslocoCoreModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        TranslocoCoreModule,
    ]
})
export class SharedModule {
}
