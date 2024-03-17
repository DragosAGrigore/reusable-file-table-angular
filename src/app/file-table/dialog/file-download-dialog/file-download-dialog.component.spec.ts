import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { FileDownloadDialogComponent } from './file-download-dialog.component';
import { MOCK_TABLE_DATA } from "../../../shared/mocks/table.mock";
import { ModalService } from "../../../shared/components/modal/services/modal.service";

describe('FileDownloadDialogComponent', () => {
  let component: FileDownloadDialogComponent;
  let fixture: ComponentFixture<FileDownloadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileDownloadDialogComponent],
      providers: [ModalService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDownloadDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('downloadedFiles', MOCK_TABLE_DATA.slice(0, 2));
    fixture.componentRef.setInput('excludedFiles', MOCK_TABLE_DATA.slice(2, 4));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render downloaded files with success indicator', () => {
    fixture.detectChanges();

    const downloadedFilesInTemplate = fixture.debugElement.queryAll(By.css('.download-dialog__file-item--success'));
    expect(downloadedFilesInTemplate.length).toBe(2);
  });

  it('should render excluded files with error message', () => {
    fixture.detectChanges();

    const excludedFilesInTemplate = fixture.debugElement.queryAll(By.css('.download-dialog__file-item:not(.download-dialog__file-item--success'));
    expect(excludedFilesInTemplate.length).toBe(2);
  });
});
