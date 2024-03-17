import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgTemplateOutlet } from "@angular/common";

import { FileInfo } from "../../model/file-info";
import { ModalService } from "../../../shared/components/modal/services/modal.service";
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-file-download-dialog',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ButtonComponent
  ],
  templateUrl: './file-download-dialog.component.html',
  styleUrl: './file-download-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDownloadDialogComponent {
  modalService = inject(ModalService);

  downloadedFiles = input.required<FileInfo[]>();
  excludedFiles = input.required<FileInfo[]>();
}
