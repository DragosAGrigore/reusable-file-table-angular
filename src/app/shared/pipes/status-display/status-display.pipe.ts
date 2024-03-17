import { Pipe, PipeTransform } from '@angular/core';
import { FileStatus, statusDisplayMap } from "../../../file-table/model/file-status";

@Pipe({
  name: 'statusDisplay',
  standalone: true
})
export class StatusDisplayPipe implements PipeTransform {
  transform(value: FileStatus): string | undefined {
    return statusDisplayMap[value];
  }
}
