import { TableSelectionService } from "./table-selection.service";
import { MOCK_TABLE_DATA, MOCK_TABLE_DATA_ROW, MockTableData } from "../../../mocks/table.mock";

describe('TableSelectionService', () => {
  let service: TableSelectionService<MockTableData>;

  beforeEach(() => {
    service = new TableSelectionService<MockTableData>();
  });

  it('should initialize with empty selected rows', () => {
    expect(service.selectedRows()).toEqual([]);
  });

  describe('toggleRow', () => {
    it('should retrieve the selected rows computed signal accordingly', () => {
      service.toggleRow(MOCK_TABLE_DATA_ROW);

      expect(service.selectedRows()).toEqual([MOCK_TABLE_DATA_ROW]);

      service.toggleRow(MOCK_TABLE_DATA_ROW);

      expect(service.selectedRows()).toEqual([]);
    });

    it('should retrieve the has selected rows flag computed signal accordingly', () => {
      service.toggleRow(MOCK_TABLE_DATA_ROW);

      expect(service.hasSelectedRows()).toBeTrue();

      service.toggleRow(MOCK_TABLE_DATA_ROW);

      expect(service.hasSelectedRows()).toBeFalse();
    });

    it('should retrieve the number of selected rows computed signal accordingly', () => {
      service.toggleRow(MOCK_TABLE_DATA_ROW);

      expect(service.selectedRowsLength()).toEqual(1);

      service.toggleRow(MOCK_TABLE_DATA_ROW);

      expect(service.selectedRowsLength()).toEqual(0);
    });
  });

  describe('toggleAllRows', () => {
    it('should retrieve the selected rows computed signal accordingly', () => {
      service.toggleAllRows(MOCK_TABLE_DATA);

      expect(service.selectedRows()).toEqual([...MOCK_TABLE_DATA]);

      service.toggleAllRows(MOCK_TABLE_DATA);

      expect(service.selectedRows()).toEqual([]);
    });

    it('should retrieve the has selected rows flag computed signal accordingly', () => {
      service.toggleAllRows(MOCK_TABLE_DATA);

      expect(service.hasSelectedRows()).toBeTrue();

      service.toggleAllRows(MOCK_TABLE_DATA);

      expect(service.hasSelectedRows()).toBeFalse();
    });

    it('should retrieve the number of selected rows computed signal accordingly', () => {
      service.toggleAllRows(MOCK_TABLE_DATA);
      const mockLength = MOCK_TABLE_DATA.length;

      expect(service.selectedRowsLength()).toEqual(mockLength);

      service.toggleAllRows(MOCK_TABLE_DATA);

      expect(service.selectedRowsLength()).toEqual(0);
    });
  });

  describe('mixed toggleRow with toggleRows', () => {
    it('should retrieve the selected rows correctly when toggling one row after toggling all', () => {
      service.toggleAllRows(MOCK_TABLE_DATA);
      service.toggleRow(MOCK_TABLE_DATA_ROW);
      const expectedRows = [...MOCK_TABLE_DATA.filter((row: MockTableData) => row != MOCK_TABLE_DATA_ROW)];

      expect(service.selectedRows()).toEqual(expectedRows)
    });

    it('should retrieve the selected rows correctly when toggling all after toggling one row', () => {
      service.toggleRow(MOCK_TABLE_DATA_ROW);
      service.toggleAllRows(MOCK_TABLE_DATA);
      const expectedRows = [...MOCK_TABLE_DATA];

      expect(service.selectedRows()).toEqual(expectedRows)
    });

    it('should retrieve the has selected rows flag correctly when toggling one row after toggling all', () => {
      service.toggleAllRows(MOCK_TABLE_DATA);
      service.toggleRow(MOCK_TABLE_DATA_ROW);

      expect(service.hasSelectedRows()).toBeTrue();
    });

    it('should retrieve the has selected rows flag correctly when toggling all after toggling one row', () => {
      service.toggleRow(MOCK_TABLE_DATA_ROW);
      service.toggleAllRows(MOCK_TABLE_DATA);

      expect(service.hasSelectedRows()).toBeTrue();
    });

    it('should retrieve the number of selected rows correctly when toggling one row after toggling all', () => {
      service.toggleAllRows(MOCK_TABLE_DATA);
      service.toggleRow(MOCK_TABLE_DATA_ROW);
      const mockLength = MOCK_TABLE_DATA.length;
      const expectedLengthShown = mockLength - 1;

      expect(service.selectedRowsLength()).toEqual(expectedLengthShown);
    });

    it('should retrieve the number of selected rows correctly when toggling all after toggling one row', () => {
      service.toggleRow(MOCK_TABLE_DATA_ROW);
      service.toggleAllRows(MOCK_TABLE_DATA);
      const mockLength = MOCK_TABLE_DATA.length;

      expect(service.selectedRowsLength()).toEqual(mockLength);
    });
  });
});
