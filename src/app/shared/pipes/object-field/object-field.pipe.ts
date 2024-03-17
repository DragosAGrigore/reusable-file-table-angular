import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectField',
  standalone: true
})
export class ObjectFieldPipe implements PipeTransform {
  transform(object: Record<string, any>, field: string): any {
    return object[field as keyof Object];
  }
}
