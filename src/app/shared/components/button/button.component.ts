import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  disabled = input<boolean | undefined>(undefined);
  ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  ariaLabelledBy = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
  ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  @Output() buttonClicked = new EventEmitter<void>();
}
