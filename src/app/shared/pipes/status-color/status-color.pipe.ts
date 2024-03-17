import { Pipe, PipeTransform } from '@angular/core';
import { FileStatusIcon, fileStatusIconMap } from "../../../file-table/model/file-status";

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {
  transform(value: FileStatusIcon): string {
    return fileStatusIconMap[value];
  }
}
