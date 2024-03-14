import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from "@angular/forms";

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CheckboxComponent,
        FormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    inputElement = fixture.nativeElement.querySelector('.checkbox__input');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true when checked', () => {
    spyOn(component.changed, 'emit');

    inputElement.checked = true;
    inputElement.dispatchEvent(new Event('change'));

    expect(component.changed.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false when unchecked', () => {
    spyOn(component.changed, 'emit');
    component.checked = true;
    fixture.detectChanges();

    inputElement.checked = false;
    inputElement.dispatchEvent(new Event('change'));

    expect(component.changed.emit).toHaveBeenCalledWith(false);
  });

  it('should emit true when intermediate changed', () => {
    spyOn(component.indeterminateChanged, 'emit');

    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges()

    expect(component.indeterminateChanged.emit).toHaveBeenCalledWith(true);
  });

  it('should have correct aria-label attribute', () => {
    fixture.componentRef.setInput('aria-label', 'Aria Label');
    fixture.detectChanges();

    expect(inputElement.getAttribute('aria-label')).toBe('Aria Label');
  });

  it('should have correct aria-labelledby attribute', () => {
    fixture.componentRef.setInput('aria-labelledby', 'labelId');
    fixture.detectChanges();

    expect(inputElement.getAttribute('aria-labelledby')).toBe('labelId');
  });

  it('should have correct aria-describedby attribute', () => {
    fixture.componentRef.setInput('aria-describedby', 'descriptionId');
    fixture.detectChanges();

    expect(inputElement.getAttribute('aria-describedby')).toBe('descriptionId');
  });
});
