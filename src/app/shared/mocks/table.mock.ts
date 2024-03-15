export interface MockTableData {
  path: string;
  device: string;
}

export const MOCK_TABLE_DATA_ROW: MockTableData = {
  path: "\\im\\just\\a\\test.exe",
  device: "Dwight Schrute"
};

export const MOCK_TABLE_DATA: MockTableData[] = [
  MOCK_TABLE_DATA_ROW,
  {
    path: "\\im\\just\\a\\test2.exe",
    device: "Michael Scott"
  },
  {
    path: "\\im\\just\\a\\test3.exe",
    device: "Jim Halpert"
  },
  {
    path: "\\im\\just\\a\\test4.exe",
    device: "Pam Beesly"
  }
];
