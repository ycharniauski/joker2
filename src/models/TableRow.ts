export type TableRowKids = Record<string, { records: TableRow[] }>;

export type TableRow = {
  id: number;
  data: Record<string, string>;
  kids: TableRowKids;
};
