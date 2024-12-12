import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "point",
  standalone: true
})

export class PointPipe implements PipeTransform {
  transform(value: number): string {
    let num: string = value.toString()
    let formatted: string = num.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return formatted
  }
}
