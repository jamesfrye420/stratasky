"use client";
import { GridDataProvider, useGridData } from "@/components/context/gridData";
import Grid from "@/components/ui/agGrid";
import Link from "next/link";
import { useMemo } from "react";

const colDefs = [
  {
    field: "determination_number",
    headerName: "Determination No.",
    suppressSizeToFit: true,
    pinned: "left",
  },
  {
    field: "1",
    editable: true,
    minWidth: 300,
  },
  {
    field: "2",
    editable: true,
    minWidth: 300,
  },
  {
    field: "3",
    editable: true,
    minWidth: 300,
  },
];

const RowData = [
  {
    determination_number: "Density bottle No.",
  },
  {
    determination_number: "Mass of Density bottle (M1) g",
  },
  {
    determination_number: "Mass of (Density bottle + soil) (M2) g",
  },
  {
    determination_number: "Mass of (Density bottle + soil + liquid) (M3) g",
  },
  {
    determination_number: "Mass of (Density bottle +liquid) (M4) g",
  },
  {
    determination_number: "Specific gravity with respect to test liquid (Gl)",
  },
];

export default function HomePage() {
  const autoSizeStrategy = useMemo(() => {
    return {
      type: "fitCellContents",
    };
  }, []);

  const { colDefs, rowData } = useGridData();
  return (
    <main className="">
      <h1 className="mb-10 text-3xl font-semibold tracking-wide">
        Specific Gravity
      </h1>
      <Grid
        cols={colDefs as any}
        rowData={RowData}
        autoSizeStrategy={autoSizeStrategy as any}
      />
      <p className="mt-10">
        Average specific gravity with respect to test liquid at lab temperature
        (Gl)av: {}
      </p>
    </main>
  );
}
