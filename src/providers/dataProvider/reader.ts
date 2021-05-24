/*
 1. recursive function
 2. use singleton pattern to generate and keep lastId.
 3. use decorator pattern to extand records with id
 4. use sppread operator and map to clone original object.
 */

import { Table } from "models/Table";
import { TableRow, TableRowKids } from "models/TableRow";

import { RawTableRow } from "./models/RawTableRow";

let lastId: number = 0;

function newId(): number {
  lastId++;
  return lastId;
}

export function read(json: RawTableRow[]): Table {
  let colsCount: number = 0;

  function rec(raw: RawTableRow): TableRow {
    colsCount = Math.max(colsCount, Object.keys(raw.data).length);

    const id = newId();
    const kids: TableRowKids = {};

    Object.keys(raw.kids).forEach((key: string) => {
      kids[key] = {
        records: raw.kids[key].records.map(rec),
      };
    });

    return {
      data: { ...raw.data },
      id: newId(),
      kids,
    };
  }

  const rows = json.map(rec);

  return {
    colsCount,
    rows,
  };
}
