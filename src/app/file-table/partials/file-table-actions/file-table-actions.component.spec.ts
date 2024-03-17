import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from "@angular/common/http";
import { By } from "@angular/platform-browser";

import { FileTableActionsComponent } from './file-table-actions.component';
import { CheckboxComponent } from "../../../shared/components/checkbox/checkbox.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";

describe('FileTableActionsComponent', () => {
  let component: FileTableActionsComponent;
  let fixture: ComponentFixture<FileTableActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileTableActionsComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileTableActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isAllSelected', false)
    fixture.componentRef.setInput('hasSelectedRows', true)
    fixture.componentRef.setInput('selectedRowsLength', 2)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit checkboxClicked event when checkbox is clicked', () => {
    const checkboxSpy = spyOn(component.checkboxClicked, 'emit');
    const checkboxComponentElement = fixture.debugElement.query(By.directive(CheckboxComponent)).nativeElement;

    checkboxComponentElement.click();

    expect(checkboxSpy).toHaveBeenCalled();
  });

  it('should emit downloadClicked event when download button is clicked', () => {
    const downloadSpy = spyOn(component.downloadClicked, 'emit');
    const downloadButton = fixture.debugElement.query(By.directive(ButtonComponent));

    downloadButton.triggerEventHandler('buttonClicked');

    expect(downloadSpy).toHaveBeenCalled();
  });
});
