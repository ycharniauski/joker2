import React, { useCallback, useEffect, useState } from "react";

import BtnExpand from "components/BtnExpand";
import BtnDelete from "components/BtnDelete";
import { TableRow, TableRowKids } from "models/TableRow";

import { useAppDispatch } from "store/hooks";
import { removePatientThunk } from "store/reducers/home/homeSlice";

import PatientsRows from "../PatientsRows";

type Props = {
  colsCount: number;
  row: TableRow;
};

export default function PatientsRow({ colsCount, row }: Props) {
  const { data, id, kids } = row;
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const expandCallback = useCallback(() => setExpanded(!expanded), [expanded]);

  const removeCallback = useCallback(() => {
    dispatch(removePatientThunk(id));
  }, []);

  const values = Object.keys(data).map((key: string) => data[key]);
  const blankValues = new Array(colsCount - values.length).fill("");
  const allValues = blankValues.concat(values);

  const kidsKeys = Object.keys(kids);
  const hasChildren = kidsKeys.some((key: string) => kids[key].records.length > 0);

  return (
    <>
      <tbody>
        <tr className="patients-row">
          <td>
            {hasChildren && <BtnExpand expanded={expanded} onClick={expandCallback} />}
          </td>
          {allValues.map((value: string, index: number) => {
            return <td key={index.toString()}>{value}</td>;
          })}
          <td>
            <BtnDelete onClick={removeCallback} />
          </td>
        </tr>
      </tbody>
      {expanded && hasChildren && kidsKeys.map((key: string) => (
          <PatientsRows key={key} rows={kids[key].records} colsCount={colsCount} title={key} />
        ))}
    </>
  );
}
