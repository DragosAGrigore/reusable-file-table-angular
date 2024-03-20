import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from "@angular/platform-browser";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { of } from 'rxjs';

import { SvgIconComponent } from './svg-icon.component';
import { SvgIconService } from "./services/svg-icon.service";
import { MOCK_SANITIZER } from "../../mocks/sanitizer.mock";

describe('IconComponent', () => {
  let component: SvgIconComponent;
  let fixture: ComponentFixture<SvgIconComponent>;
  let componentElement: HTMLElement;
  let spySvgIconService;

  beforeEach(async () => {
    spySvgIconService = jasmine.createSpyObj(['getSvgIcon']);

    await TestBed.configureTestingModule({
      imports: [SvgIconComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: SvgIconService, useValue: spySvgIconService },
        { provide: DomSanitizer, useValue: MOCK_SANITIZER }
      ]
    })
    .compileComponents();

    spySvgIconService.getSvgIcon.and.returnValue(of('<svg></svg>'));
    fixture = TestBed.createComponent(SvgIconComponent);
    fixture.componentRef.setInput('fileName', 'circle');
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct style attribute', () => {
    fixture.componentRef.setInput('color', 'purple');
    fixture.detectChanges();

    expect(componentElement.getAttribute('style')).toContain('color: purple;');
  });

  it('should have correct default style attribute', () => {
    fixture.detectChanges();

    expect(componentElement.getAttribute('style')).toContain('color: black;');
  });

  it('should have correct aria-label attribute', () => {
    fixture.componentRef.setInput('aria-label', 'Aria Label');
    fixture.detectChanges();

    expect(componentElement.getAttribute('aria-label')).toBe('Aria Label');
  });

  it('should have correct aria-labelledby attribute', () => {
    fixture.componentRef.setInput('aria-labelledby', 'labelId');
    fixture.detectChanges();

    expect(componentElement.getAttribute('aria-labelledby')).toBe('labelId');
  });

  it('should have correct aria-describedby attribute', () => {
    fixture.componentRef.setInput('aria-describedby', 'descriptionId');
    fixture.detectChanges();

    expect(componentElement.getAttribute('aria-describedby')).toBe('descriptionId');
  });

  it('should have correct aria-describedby attribute', () => {
    fixture.componentRef.setInput('title', 'title to show');
    fixture.detectChanges();

    expect(componentElement.getAttribute('title')).toBe('title to show');
  });
});
