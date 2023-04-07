import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cashaccount'
})
export class CashaccountPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return value == 2 ? 'real account' : 'demo account';
  }

}
