import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SvgIconService {
  http = inject(HttpClient);

  getSvgIcon(fileName: string): Observable<string> {
    return this.http.get(
      `assets/svg/${fileName}.svg`,
      {
        responseType: "text"
      });
  }
}
