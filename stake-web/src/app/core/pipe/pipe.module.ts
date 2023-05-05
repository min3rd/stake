import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
import { DatetimePipe } from './datetime.pipe';
import { CountdownPipe } from './countdown.pipe';
import { CurrencyPipe } from './currency.pipe';
import { CashaccountPipe } from './cashaccount.pipe';
import { UppercasePipe } from './uppercase.pipe';



@NgModule({
  declarations: [
    CapitalizePipe,
    DatetimePipe,
    CountdownPipe,
    CurrencyPipe,
    CashaccountPipe,
    UppercasePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CapitalizePipe,
    DatetimePipe,
    CountdownPipe,
    CurrencyPipe,
    CashaccountPipe,
    UppercasePipe
  ]
})
export class PipeModule { }
