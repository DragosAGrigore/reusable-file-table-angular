import { TemplateRef } from "@angular/core";

import { CustomTemplateContext } from "./custom-template-context";

export interface TableColumnConfig<T extends Record<string, any>> {
  field: string;
  headerText?: string;
  customTemplate?: TemplateRef<CustomTemplateContext<T>>;
}
