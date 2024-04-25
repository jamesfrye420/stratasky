"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-quartz.css";

import {
  ColDef,
  ColGroupDef,
  ValueGetterParams,
  ModuleRegistry,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  SizeColumnsToContentStrategy,
} from "@ag-grid-community/core";

type cols = ColDef<any, any> | ColGroupDef<any>;

interface Props {
  cols: cols[];
  rowData?: any[];
  autoSizeStrategy?:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy;
}
const Grid = ({ cols, rowData: rowDataInput, autoSizeStrategy }: Props) => {
  const [colDefs, setColDefs] = useState<cols[]>(cols);
  const [rowData, setRowData] = useState<any[]>(rowDataInput || []);
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
