import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit buttonClicked event when button is clicked', () => {
    const buttonClickedSpy = spyOn(component.buttonClicked, 'emit');

    buttonElement.click();

    expect(buttonClickedSpy).toHaveBeenCalled();
  });

  it('should not emit buttonClicked event when button is clicked and disabled', () => {
    const buttonClickedSpy = spyOn(component.buttonClicked, 'emit');
    fixture.componentRef.setInput('disabled', true);

    buttonElement.click();

    expect(buttonClickedSpy).toHaveBeenCalled();
  });

  it('should disable button if disabled input is set', () => {
    fixture.componentRef.setInput('disabled', true)
    fixture.detectChanges();

    expect(buttonElement.disabled).toBeTruthy();
  });


  it('should have correct aria-label attribute', () => {
    fixture.componentRef.setInput('aria-label', 'Aria Label');
    fixture.detectChanges();

    expect(buttonElement.getAttribute('aria-label')).toBe('Aria Label');
  });

  it('should have correct aria-labelledby attribute', () => {
    fixture.componentRef.setInput('aria-labelledby', 'labelId');
    fixture.detectChanges();

    expect(buttonElement.getAttribute('aria-labelledby')).toBe('labelId');
  });

  it('should have correct aria-describedby attribute', () => {
    fixture.componentRef.setInput('aria-describedby', 'descriptionId');
    fixture.detectChanges();

    expect(buttonElement.getAttribute('aria-describedby')).toBe('descriptionId');
  });

  it('should have correct aria-describedby attribute', () => {
    fixture.componentRef.setInput('aria-disabled', true);
    fixture.detectChanges();

    expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
  });
});
