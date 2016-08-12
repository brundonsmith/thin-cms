import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pluralize'})
export class PluralizePipe implements PipeTransform {
  transform(value: string): string {
    if(value.charAt(value.length - 1).toLowerCase() === 's') {
      return value + 'es';
    } else {
      return value + 's';
    }
  }
}
