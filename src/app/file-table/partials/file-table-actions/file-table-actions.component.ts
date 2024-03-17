import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';

import { CheckboxComponent } from "../../../shared/components/checkbox/checkbox.component";
import { SvgIconComponent } from "../../../shared/components/svg-icon/svg-icon.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-file-table-actions',
  standalone: true,
  imports: [
    CheckboxComponent,
    SvgIconComponent,
    ButtonComponent
  ],
  templateUrl: './file-table-actions.component.html',
  styleUrl: './file-table-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTableActionsComponent {
  isAllSelected = input.required<boolean>();
  hasSelectedRows = input.required<boolean>();
  selectedRowsLength = input.required<number>();

  @Output() checkboxClicked = new EventEmitter<void>();
  @Output() downloadClicked = new EventEmitter<void>();
}
