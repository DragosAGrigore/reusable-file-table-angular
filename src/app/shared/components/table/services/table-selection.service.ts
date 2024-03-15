import { computed, Injectable, Signal, signal } from "@angular/core";

@Injectable()
export class TableSelectionService<T> {
  #selectedRows = signal<Array<T>>([]);

  selectedRows: Signal<Array<T>> = computed(() => this.#selectedRows());
  selectedRowsLength: Signal<number> = computed(() => this.selectedRows().length);
  hasSelectedRows: Signal<boolean> = computed(() => this.selectedRowsLength() !== 0);

  toggleRow(row: T): void {
    this.#selectedRows().includes(row)
      ? this.#selectedRows.update(selectedRows => selectedRows.filter(selectedRow => row != selectedRow))
      : this.#selectedRows.update(selectedRows => [...selectedRows, row]);
  }

  toggleAllRows(data: Array<T>): void {
    this.#selectedRows.set(
      this.selectedRowsLength() === data.length
        ? []
        : [...data]
    );
  }
}
