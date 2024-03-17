import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./file-table/file-table.component')
}];

