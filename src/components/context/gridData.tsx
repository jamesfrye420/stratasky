"use client";

import React, { createContext, useContext, useState } from "react";
import { cols } from "../ui/agGrid";

interface context {
  colDefs: cols[];
  setColDefs: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  rowData: any[];
  setRowData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}

const GridContext = createContext<context | undefined>(undefined);

export const useGridData = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridData must be used within a GridContext ");
  }
  return context;
};

export const GridDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [colDefs, setColDefs] = useState<cols[]>();
  const [rowData, setRowData] = useState<any[]>();

  return (
    <GridContext.Provider
      value={{ colDefs, setColDefs, rowData, setRowData } as context}
    >
      {children}
    </GridContext.Provider>
  );
};
