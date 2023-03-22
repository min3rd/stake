import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { DenseLayoutModule } from 'app/layout/dense/dense.module';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { EmptyLayoutModule } from './empty/empty.module';
import { ThinLayoutModule } from './thin/thin.module';

const layoutModules = [
    EmptyLayoutModule,
    DenseLayoutModule,
    ThinLayoutModule,
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        SharedModule,
        SettingsModule,
        ...layoutModules
    ],
    exports: [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule {
}
