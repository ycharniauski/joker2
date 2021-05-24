/* 
  use responseDelay property just for fun. I setup it to 200ms.
  I want to emulate a server process to show how applicaiton works with async requests
*/

import { Table } from "models/Table";
import { TableRow, TableRowKids } from "models/TableRow";
import { sleep } from "utils/timeUtils";

import { DataProvider } from "./models/DataProvider";
import { RawTableRow } from "./models/RawTableRow";
import { read } from "./reader";
import patientsJson from "./data/patients.json";

type CreateDataProviderParams = {
  responseDelay: number;
};

export function createDataProvider({ responseDelay }: CreateDataProviderParams): DataProvider {
  let patients: Table = read(<RawTableRow[]>patientsJson);

  return {
    getPatients: async () => {
      await sleep(responseDelay);

      return patients;
    },
    removePatientsRow: async (id: number) => {
      await sleep(responseDelay);

      function rec(records: TableRow[]): TableRow[] {
        return records
          .filter((row: TableRow) => {
            if (row.id === id) return false;
            return true;
          })
          .map((row: TableRow) => ({
            ...row,
            kids: Object.keys(row.kids).reduce((acc: TableRowKids, key: string): TableRowKids => {
              acc[key] = {
                records: rec(row.kids[key].records),
              };
              return acc;
            }, <TableRowKids>{}),
          }));
      }

      patients = {
        ...patients,
        rows: rec(patients.rows),
      };

      return patients;
    },
  };
}
