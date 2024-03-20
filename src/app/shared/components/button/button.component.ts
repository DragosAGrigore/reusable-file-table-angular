import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  disabled = input<boolean | undefined>(undefined);
  ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  ariaLabelledBy = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
  ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });
  ariaDisabled = input<boolean | undefined>(undefined, { alias: 'aria-disabled' });

  @Output() buttonClicked = new EventEmitter<void>();
}
