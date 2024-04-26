"use client";
import { GridDataProvider, useGridData } from "@/components/context/gridData";
import Grid from "@/components/ui/agGrid";
import Link from "next/link";
import { useEffect, useMemo } from "react";

const ColumnDefinations = [
  {
    field: "container_number",
    headerName: "Container No.",
    suppressSizeToFit: true,
    pinned: "left",
  },
  {
    field: "1",
    editable: true,
    minWidth: 500,
  },
  {
    field: "2",
    editable: true,
    minWidth: 500,
  },
];

const RowData = [
  {
    container_number: "Mass of (container + wet soil) g",
  },
  {
    container_number: "Mass of (container + dry soil) g",
  },
  {
    container_number: "Mass of dry soil  g",
  },
  {
    container_number: "Mass of container g",
  },
  {
    container_number: "Mass of water g",
  },
  {
    container_number: "Water content (wi) %",
  },
];

export default function HomePage() {
  const autoSizeStrategy = useMemo(() => {
    return {
      type: "fitCellContents",
    };
  }, []);

  const { colDefs, rowData, setColDefs, setRowData } = useGridData();
  useEffect(() => {
    setColDefs(ColumnDefinations);
    setRowData(RowData);
  }, []);

  return (
    <main className="">
      <h1 className="mb-10 text-3xl font-semibold tracking-wide">Vane Shear</h1>
      <Grid autoSizeStrategy={autoSizeStrategy as any} />
    </main>
  );
}
