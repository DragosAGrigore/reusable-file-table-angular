import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { take } from "rxjs";

import { SvgIconService } from "./services/svg-icon.service";

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "icon__container",
    "[innerHTML]": "svgIcon()",
    "[attr.aria-label]" : "ariaLabel()",
    "[attr.aria-labelledby]": "ariaLabelledBy()",
    "[attr.aria-describedby]": "ariaDescribedBy()",
    "[style.color]": "color()",
    "role": "img"
  }
})
export class SvgIconComponent {
  domSanitizer = inject(DomSanitizer);
  svgIconService = inject(SvgIconService);

  fileName = input.required<string>();
  ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  ariaLabelledBy = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
  ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });
  color = input<string>('black');
  svgIcon = signal<any>("");

  constructor() {
    effect(() => {
      this.svgIconService.getSvgIcon(this.fileName())
        .pipe(take(1))
        .subscribe((svgHtml: string) => {
          this.svgIcon.set(this.domSanitizer.bypassSecurityTrustHtml(svgHtml));
        });
    });
  }
}
