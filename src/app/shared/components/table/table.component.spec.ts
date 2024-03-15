import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { MOCK_TABLE_DATA, MOCK_TABLE_DATA_ROW, MockTableData } from "../../mocks/table.mock";

describe('TableComponent', () => {
  let component: TableComponent<MockTableData>;
  let fixture: ComponentFixture<TableComponent<MockTableData>>;
  let tableElement: HTMLTableElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent<MockTableData>);
    component = fixture.componentInstance;
    tableElement = fixture.nativeElement.querySelector('.table__container');
    fixture.detectChanges();
  });

  it('should have initial properties set correctly', () => {
    expect(component.caption()).toBeUndefined();
    expect(component.columns()).toEqual([]);
    expect(component.data()).toEqual([]);
    expect(component.selectable()).toBeFalse();
    expect(component.ariaLabel()).toBeUndefined();
    expect(component.ariaLabelledBy()).toBeUndefined();
    expect(component.ariaDescribedBy()).toBeUndefined();
  });

  it('should have correct aria-label attribute', () => {
    fixture.componentRef.setInput('aria-label', 'Aria Label');
    fixture.detectChanges();

    expect(tableElement.getAttribute('aria-label')).toBe('Aria Label');
  });

  it('should have correct aria-labelledby attribute', () => {
    fixture.componentRef.setInput('aria-labelledby', 'labelId');
    fixture.detectChanges();

    expect(tableElement.getAttribute('aria-labelledby')).toBe('labelId');
  });

  it('should have correct aria-describedby attribute', () => {
    fixture.componentRef.setInput('aria-describedby', 'descriptionId');
    fixture.detectChanges();

    expect(tableElement.getAttribute('aria-describedby')).toBe('descriptionId');
  });

  it('should have correct aria-describedby attribute', () => {
    const mockCaption = 'This table is for showing the Dunder Mifflin top secret files';
    fixture.componentRef.setInput('caption', mockCaption);
    fixture.detectChanges();

    let captionElement = fixture.nativeElement.querySelector('.table__caption');
    expect(captionElement.textContent.trim()).toBe(mockCaption);
  });

  describe('selectable table', () => {
    it('should toggle row selection when called', () => {
      fixture.componentRef.setInput('data', MOCK_TABLE_DATA);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      component.onClickRow(MOCK_TABLE_DATA_ROW);

      expect(component.selectedRows()).toEqual([MOCK_TABLE_DATA_ROW]);
      expect(component.selectedRowsLength()).toBe(1);
      expect(component.isAllSelected()).toBeFalse();
      expect(component.hasSelectedRows()).toBeTrue();
    });

    it('should have no selected rows when toggle row is called twice', () => {
      fixture.componentRef.setInput('data', MOCK_TABLE_DATA);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      component.onClickRow(MOCK_TABLE_DATA_ROW);
      component.onClickRow(MOCK_TABLE_DATA_ROW);

      expect(component.selectedRows()).toEqual([]);
      expect(component.selectedRowsLength()).toBe(0);
      expect(component.isAllSelected()).toBeFalse();
      expect(component.hasSelectedRows()).toBeFalse();
    });

    it('should have all rows selected when toggle all rows is called', () => {
      fixture.componentRef.setInput('data', MOCK_TABLE_DATA);
      fixture.componentRef.setInput('selectable', true);
      const mockLength = MOCK_TABLE_DATA.length;
      fixture.detectChanges();

      component.toggleAllRows();

      expect(component.selectedRows()).toEqual([...MOCK_TABLE_DATA]);
      expect(component.selectedRowsLength()).toBe(mockLength);
      expect(component.isAllSelected()).toBeTrue();
    });

    it('should have no selected rows when toggle all rows is called twice', () => {
      fixture.componentRef.setInput('data', MOCK_TABLE_DATA);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      component.toggleAllRows();
      component.toggleAllRows();

      expect(component.selectedRows()).toEqual([]);
      expect(component.selectedRowsLength()).toBe(0);
      expect(component.isAllSelected()).toBeFalse();
      expect(component.hasSelectedRows()).toBeFalse();
    });
  });

  describe('text only table (not selectable)', () => {
    it('should have no selected rows when toggling all rows', () => {
      fixture.componentRef.setInput('data', MOCK_TABLE_DATA);
      fixture.detectChanges();

      component.toggleAllRows();

      expect(component.selectedRows()).toEqual([]);
      expect(component.selectedRowsLength()).toBe(0);
      expect(component.isAllSelected()).toBeFalse();
      expect(component.hasSelectedRows()).toBeFalse();
    });

    it('should have no selected rows when toggling a row', () => {
      fixture.componentRef.setInput('data', MOCK_TABLE_DATA);
      fixture.detectChanges();

      component.onClickRow(MOCK_TABLE_DATA_ROW);

      expect(component.selectedRows()).toEqual([]);
      expect(component.selectedRowsLength()).toBe(0);
      expect(component.isAllSelected()).toBeFalse();
      expect(component.hasSelectedRows()).toBeFalse();
    });
  });
});
