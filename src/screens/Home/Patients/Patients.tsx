import React, { memo, useEffect } from "react";
import { Table } from "models/Table";
import { TableRow } from "models/TableRow";

import PatientsRows from "../PatientsRows";

type Props = {
  patients: Table;
};

function Patients({ patients }: Props) {
  const { colsCount } = patients;
  return (
    <table className="patients">
      <PatientsRows rows={patients.rows} colsCount={10} title={"JSON"} />
    </table>
  );
}

export default memo<Props>(Patients);
