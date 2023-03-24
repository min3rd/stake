import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    let time = moment(value);
    if (!time || !time.isValid()) {
      return '';
    }
    return time.format(args[0] ?? "");
  }

}
