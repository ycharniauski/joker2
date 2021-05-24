/* global describe, it, expect */
import { Table } from "models/Table";
import { TableRow } from "models/TableRow";
import { createDataProvider } from "providers/dataProvider/createDataProvider";

function find(rows: TableRow[], name: string, value: string): TableRow | undefined {
  let res: TableRow | undefined;

  function findRowRec(row: TableRow) {
    if (row.data[name] === value) {
      res = row;
      return;
    }
    Object.keys(row.kids).forEach((key: string) => {
      row.kids[key].records.forEach(findRowRec);
    });
  }

  rows.forEach(findRowRec);

  return res;
}

describe("dataProvider test", () => {
  const provider = createDataProvider({ responseDelay: 0 });

  it("Test get patients", async () => {
    let patients = await provider.getPatients();
    expect(patients).toBeTruthy();
    expect(patients.colsCount).toBe(10);

    const propName = "Phone";
    const propValue = "+(179)-982-0570";

    let row = find(patients.rows, propName, propValue);
    expect(row).toBeTruthy();

    if (!row) throw new Error("Row not found");

    patients = await provider.removePatientsRow(row.id);

    row = find(patients.rows, propName, propValue);

    expect(row).toBeFalsy();
  });
});
