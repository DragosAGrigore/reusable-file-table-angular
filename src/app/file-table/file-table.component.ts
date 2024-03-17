import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";

import { CustomTemplateContext } from "../shared/components/table/model/custom-template-context";
import { FileInfo } from "./model/file-info";
import { TableColumnConfig } from "../shared/components/table/model/table-column-config";
import { CheckboxComponent } from "../shared/components/checkbox/checkbox.component";
import { TableComponent } from "../shared/components/table/table.component";
import { FileDataService } from "./services/file-data.service";
import { SvgIconComponent } from "../shared/components/svg-icon/svg-icon.component";
import { FileTableActionsComponent } from "./partials/file-table-actions/file-table-actions.component";
import { fileStatusIconMap, fileStatusDisplayMap } from "./model/file-status";
import { ObjectFieldPipe } from "../shared/pipes/object-field/object-field.pipe";
import { ModalService } from "../shared/components/modal/services/modal.service";

@Component({
  selector: 'app-file-table',
  standalone: true,
  imports: [
    CheckboxComponent,
    TableComponent,
    SvgIconComponent,
    FileTableActionsComponent,
    ObjectFieldPipe,
  ],
  templateUrl: './file-table.component.html',
  styleUrl: './file-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class FileTableComponent implements OnInit {
  fileDataService = inject(FileDataService);
  modalService = inject(ModalService);

  @ViewChild('statusTemplate', { static: true }) statusTemplateRef!: TemplateRef<CustomTemplateContext<FileInfo>>
  @ViewChild(TableComponent) tableComponent!: TableComponent<FileInfo>;

  data: Signal<FileInfo[]> = toSignal(this.fileDataService.getFileData(), { initialValue: [] });
  columns: TableColumnConfig<FileInfo>[] = [];

  protected readonly fileStatusIconMap = fileStatusIconMap;
  protected readonly fileStatusDisplayMap = fileStatusDisplayMap;
  protected readonly Object = Object;

  ngOnInit() {
    this.columns = [
      {
        field: 'name'
      },
      {
        field: 'device'
      },
      {
        field: 'path'
      },
      {
        field: 'status',
        customTemplate: this.statusTemplateRef
      },
    ];
  }

  onDownloadClick(): void {
    const downloadedFiles = this.tableComponent?.selectedRows().filter(row => row.status === 'available');
    const excludedFiles = this.tableComponent?.selectedRows().filter(row => row.status !== 'available');

    this.modalService.openDownloadModal(downloadedFiles, excludedFiles);
  }
}
