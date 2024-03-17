import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, TemplateRef, ViewChild } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";

import { CustomTemplateContext } from "../shared/components/table/model/custom-template-context";
import { FileInfo } from "./model/file-info";
import { TableColumnConfig } from "../shared/components/table/model/table-column-config";
import { CheckboxComponent } from "../shared/components/checkbox/checkbox.component";
import { TableComponent } from "../shared/components/table/table.component";
import { FileDataService } from "./services/file-data.service";
import { SvgIconComponent } from "../shared/components/svg-icon/svg-icon.component";
import { FileTableActionsComponent } from "./partials/file-table-actions/file-table-actions.component";
import { StatusDisplayPipe } from "../shared/pipes/status-display/status-display.pipe";
import { fileStatusIconMap } from "./model/file-status";
import { StatusColorPipe } from "../shared/pipes/status-color/status-color.pipe";

@Component({
  selector: 'app-file-table',
  standalone: true,
  imports: [
    CheckboxComponent,
    TableComponent,
    SvgIconComponent,
    FileTableActionsComponent,
    StatusDisplayPipe,
    StatusColorPipe
  ],
  templateUrl: './file-table.component.html',
  styleUrl: './file-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class FileTableComponent implements OnInit {
  fileDataService = inject(FileDataService);

  @ViewChild('statusTemplate', { static: true }) statusTemplateRef!: TemplateRef<CustomTemplateContext<FileInfo>>
  data: Signal<FileInfo[]> = toSignal(this.fileDataService.getFileData(), { initialValue: [] });
  columns: TableColumnConfig<FileInfo>[] = [];
  protected readonly fileStatusIconMap = fileStatusIconMap;
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

  }
}
