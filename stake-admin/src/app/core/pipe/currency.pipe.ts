import { Pipe, PipeTransform } from '@angular/core';
import currency from 'currency.js';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return currency(value).format({
      useVedic: true
    });
  }
}
