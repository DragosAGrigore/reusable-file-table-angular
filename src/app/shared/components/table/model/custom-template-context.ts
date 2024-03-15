import { TableColumnConfig } from "./table-column-config";

export interface CustomTemplateContext<T extends Record<string, any>> {
  $implicit: T;
  column: TableColumnConfig<T>
}
