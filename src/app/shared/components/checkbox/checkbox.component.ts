import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  input,
  Input,
  Output
} from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  exportAs: 'appCheckbox',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  indeterminate = input(false);

  id = input<string>();
  name = input<string>();
  disabled = input(false);
  ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  ariaLabelledBy = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
  ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  @Input() checked = false; //not using input signal because of incompatibility; input signals are read-only
  @Output() readonly changed = new EventEmitter<boolean>();
  @Output() readonly indeterminateChanged = new EventEmitter<boolean>();

  constructor() {
    effect(() => this.indeterminateChanged.emit(this.indeterminate()))
  }

  onChange(): void {
    this.changed.emit(this.checked);
  }
}
