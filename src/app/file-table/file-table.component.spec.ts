import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";

import FileTableComponent from './file-table.component';
import { FileTableActionsComponent } from "./partials/file-table-actions/file-table-actions.component";

describe('FileTableComponent', () => {
  let component: FileTableComponent;
  let fixture: ComponentFixture<FileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize columns and data correctly', () => {
    expect(component.columns.length).toBe(4);
  });

  it('should call onDownloadClick when download button is clicked', () => {
    const downloadSpy = spyOn(component, 'onDownloadClick');
    const fileTableActionsComponent = fixture.debugElement.query(By.directive(FileTableActionsComponent));

    fileTableActionsComponent.triggerEventHandler('downloadClicked');

    expect(downloadSpy).toHaveBeenCalled();
  });
});
