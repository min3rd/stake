import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let minutes: any = parseInt(`${value / 60}`, 10);
    let seconds: any = parseInt(`${value % 60}`, 10);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes} : ${seconds}`;
  }

}
