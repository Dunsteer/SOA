import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "ceil",
})
export class CeilPipe implements PipeTransform {
  transform(
    number: number,
  ): any {
    return Math.ceil(number);
  }
}
