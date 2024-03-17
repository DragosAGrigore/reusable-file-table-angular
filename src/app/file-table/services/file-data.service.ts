import { Injectable } from "@angular/core";

import { FileInfo } from "../model/file-info";
import { Observable, catchError, of } from "rxjs";
import { MOCK_FILE_INFO_ARRAY } from "../../shared/mocks/file-info.mock";

const handleError = (error: any) => {
  //treat error
  console.error(error);
  return of([]);
}

@Injectable({
  providedIn: 'root'
})
export class FileDataService {
  getFileData(): Observable<FileInfo[]> {
    return of(MOCK_FILE_INFO_ARRAY)
      .pipe(
        catchError(handleError)
      );
  }
}
