import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { NgForOf, NgTemplateOutlet, TitleCasePipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { TableSelectionService } from "./services/table-selection.service";
import { TableColumnConfig } from "./model/table-column-config";
import { CheckboxComponent } from "../checkbox/checkbox.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgForOf,
    TitleCasePipe,
    NgTemplateOutlet,
    CheckboxComponent,
    ReactiveFormsModule
  ],
  providers: [
    TableSelectionService
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  exportAs: 'appTable',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T extends Record<string, any>> {
  tableService = inject(TableSelectionService<T>);

  caption = input<string>();
  columns = input<TableColumnConfig<T>[]>([]);
  data = input<T[]>([]);
  selectable = input(false);
  ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  ariaLabelledBy = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
  ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  isAllSelected: Signal<boolean> = computed(() => this.tableService.selectedRowsLength() === this.data().length);
  hasSelectedRows: Signal<boolean> = computed(() => this.tableService.hasSelectedRows());
  selectedRows: Signal<T[]> = this.tableService.selectedRows;
  selectedRowsLength: Signal<number> = this.tableService.selectedRowsLength;

  onClickRow(row: T): void {
    if (this.selectable()) {
      this.tableService.toggleRow(row);
    }
  }

  toggleAllRows(): void {
    if (this.selectable()) {
      this.tableService.toggleAllRows(this.data());
    }
  }
}
