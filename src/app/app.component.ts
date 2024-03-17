import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import FileTableComponent from "./file-table/file-table.component";
import { ModalService } from "./shared/components/modal/services/modal.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FileTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    "[attr.inert]": "modalService.isModalOpen() ? '' : null"
  }
})
export class AppComponent {
  readonly modalService = inject(ModalService);
}
