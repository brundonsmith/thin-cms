import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'unCamel'})
export class UnCamelPipe implements PipeTransform {
  transform(value: string): string {
    var words = [];

    var beginningOfWord = 0;
    for(var i = 1; i < value.length; i++) {
      if(this.isUpperCase(value.charAt(i))) {
        words.push(value.substring(beginningOfWord, i));
        beginningOfWord = i;
      } else if(i === value.length - 1) {
        words.push(value.substring(beginningOfWord));
      }
    }

    for(var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1).toLowerCase();
    }

    return words.join(' ');
  }

  private isUpperCase(aString: string) {
    return aString === aString.toUpperCase();
  }
}
