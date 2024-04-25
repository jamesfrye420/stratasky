"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-quartz.css";

import {
  ColDef,
  ColGroupDef,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  SizeColumnsToContentStrategy,
} from "@ag-grid-community/core";
import { useGridData } from "../context/gridData";

export type cols = ColDef<any, any> | ColGroupDef<any>;

interface Props {
  autoSizeStrategy?:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy;
}
const Grid = ({ autoSizeStrategy }: Props) => {
  const { colDefs, setColDefs, rowData, setRowData } = useGridData();

  console.log(rowData);

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      // the grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs as any}
        autoSizeStrategy={autoSizeStrategy}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default Grid;
