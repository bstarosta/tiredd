import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ColorConverterService {
  calculateBackgroundColor(stringInput: string) {
    const stringUniqueHash = [...stringInput].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    console.log(stringInput, stringUniqueHash)
    return `hsl(${stringUniqueHash % 360}, 100%, 50%)`;
  }
}
