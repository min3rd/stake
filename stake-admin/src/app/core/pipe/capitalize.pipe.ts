import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value.length <= 0) {
      return value;
    }
    return value.substring(0, 1).toLocaleUpperCase() + value.substring(1);
  }

}
