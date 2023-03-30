import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
import { DatetimePipe } from './datetime.pipe';
import { CountdownPipe } from './countdown.pipe';



@NgModule({
  declarations: [
    CapitalizePipe,
    DatetimePipe,
    CountdownPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CapitalizePipe,
    DatetimePipe,
    CountdownPipe,
  ]
})
export class PipeModule { }
