import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToKeys'
})
export class ObjectToKeysPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return value;
    }
    return Object.keys(value);
  }

}
