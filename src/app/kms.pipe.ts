import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kms'
})
export class KmsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.round(value * 3.6);
  }

}
