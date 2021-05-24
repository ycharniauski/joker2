export interface RawTableRow {
  data: Record<string, string>;
  kids: Record<string, { records: RawTableRow[] }>;
}
