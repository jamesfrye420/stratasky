"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-quartz.css";

import {
  ColDef,
  ColGroupDef,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  SizeColumnsToContentStrategy,
  GetRowIdParams,
} from "@ag-grid-community/core";
import { useGridData } from "../context/gridData";

export type cols = ColDef<any, any> | ColGroupDef<any>;

interface Props {
  autoSizeStrategy?:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy;
  setGridReady?: () => void;
  setDummy: any;
}
const Grid = forwardRef(
  ({ autoSizeStrategy, setGridReady = () => {}, setDummy }: Props, ref) => {
    const { colDefs, setColDefs, rowData, setRowData } = useGridData();

    const getRowId = useCallback(
      (params: GetRowIdParams) => params.data.id,
      [],
    );

    return (
      <div
        className="ag-theme-quartz" // applying the grid theme
        // the grid will fill the size of the parent container
      >
        <AgGridReact
          ref={ref as any}
          rowData={rowData}
          columnDefs={colDefs as any}
          autoSizeStrategy={autoSizeStrategy}
          domLayout="autoHeight"
          onCellValueChanged={() => setDummy((prev: any) => prev + 1)}
          // @ts-ignore
          onGridReady={() => setGridReady((prev) => !prev)}
          getRowId={getRowId as any}
          stopEditingWhenCellsLoseFocus={true}
        />
      </div>
    );
  },
);

export default Grid;
