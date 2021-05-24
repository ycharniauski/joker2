import { Table } from "models/Table";

export interface DataProvider {
  getPatients(): Promise<Table>;
  removePatientsRow(id: number): Promise<Table>;
}
