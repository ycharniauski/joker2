import React, { useCallback, useEffect, useState } from "react";

import { TableRow } from "models/TableRow";

import PatientsRow from "../PatientsRow";

type Props = {
  colsCount: number;
  rows: TableRow[];
  title: string;
};

export default function PatientsRows({ colsCount, rows, title }: Props) {
  const [first] = rows;
  if (!first) {
    return (
      <thead className='patients-rows__head'>
        <tr>
          <th />
          <th colSpan={colsCount}>No data</th>
          <th />
        </tr>
      </thead>
    );
  }
  
  const headers = Object.keys(first.data);
  const blankHeaders = new Array(colsCount - headers.length).fill("");
  const allHeaders = blankHeaders.concat(headers);

  return (
    <>
      <thead className='patients-rows__head'>
        <tr>
          <th />
          <th colSpan={colsCount}>{title}</th>
          <th />
        </tr>
        <tr>
          <th />
          {allHeaders.map((value: string, index: number) => {
            return <th key={index.toString()}>{value}</th>;
          })}
          <th />
        </tr>
      </thead>
      {rows.map((row: TableRow) => (
        <PatientsRow key={row.id.toString()} row={row} colsCount={colsCount} />
      ))}
    </>
  );
}
