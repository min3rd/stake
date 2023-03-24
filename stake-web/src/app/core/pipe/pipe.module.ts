import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
import { DatetimePipe } from './datetime.pipe';



@NgModule({
  declarations: [
    CapitalizePipe,
    DatetimePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CapitalizePipe,
    DatetimePipe,
  ]
})
export class PipeModule { }
