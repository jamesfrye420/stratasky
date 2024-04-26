"use client";
import { GridDataProvider, useGridData } from "@/components/context/gridData";
import Grid from "@/components/ui/agGrid";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const ColumnDefinations = [
  {
    field: "id",
    hide: true,
  },
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
    id: "1",
    determination_number: "pycnometer No.",
  },
  {
    id: "2",
    determination_number: "Mass of pycnometer (M1) g",
    1: 31.45,
  },
  {
    id: "3",
    determination_number: "Mass of (pycnometer + soil) (M2) g",
    1: 39.9,
  },
  {
    id: "4",
    determination_number: "Mass of (pycnometer + soil + liquid) (M3) g",
    1: 86.61,
  },
  {
    id: "5",
    determination_number: "Mass of (pycnometer +liquid) (M4) g",
    1: 81.41,
  },
];

export default function HomePage() {
  const autoSizeStrategy = useMemo(() => {
    return {
      type: "fitCellContents",
    };
  }, []);

  const { colDefs, rowData, setColDefs, setRowData } = useGridData();

  const [M_avg, setM_avg] = useState<number | undefined>();

  const [gridReady, setGridReady] = useState(false);
  const [dummy, setDummy] = useState(0);

  const gridRef = useRef<AgGridReact>();

  useEffect(() => {
    if (rowData && gridRef) {
      const M11 = +gridRef.current?.api?.getRowNode("2")?.data[1];
      const M12 = +gridRef.current?.api?.getRowNode("2")?.data[2];
      const M13 = +gridRef.current?.api?.getRowNode("2")?.data[3];

      const M21 = +gridRef.current?.api?.getRowNode("3")?.data[1];
      const M22 = +gridRef.current?.api?.getRowNode("3")?.data[2];
      const M23 = +gridRef.current?.api?.getRowNode("3")?.data[3];

      const M31 = +gridRef.current?.api?.getRowNode("4")?.data[1];
      const M32 = +gridRef.current?.api?.getRowNode("4")?.data[2];
      const M33 = +gridRef.current?.api?.getRowNode("4")?.data[3];

      const M41 = +gridRef.current?.api?.getRowNode("5")?.data[1];
      const M42 = +gridRef.current?.api?.getRowNode("5")?.data[2];
      const M43 = +gridRef.current?.api?.getRowNode("5")?.data[3];

      const M_sample1 = (M21 - M11) / (M21 - M11 - (M31 - M41));
      const M_sample2 = (M22 - M12) / (M22 - M12 - (M32 - M42));
      const M_sample3 = (M23 - M13) / (M23 - M13 - (M33 - M43));

      const M_arr = [M_sample1, M_sample2, M_sample3];
      const numM_arr = M_arr.filter((num) => !Number.isNaN(num));

      const Msum = numM_arr.reduce((a, b) => a + b, 0);
      const Mavg = +(Msum / numM_arr.length).toFixed(2);

      setM_avg(Mavg);
    }
  }, [dummy, gridReady]);

  useEffect(() => {
    setColDefs(ColumnDefinations);
    setRowData(RowData);
  }, []);

  return (
    <main className="">
      <h1 className="mb-10 text-3xl font-semibold tracking-wide">
        Specific Gravity
      </h1>
      <Grid
        autoSizeStrategy={autoSizeStrategy as any}
        ref={gridRef}
        setGridReady={setGridReady as any}
        setDummy={setDummy}
      />
      <p className="mt-10">
        Average specific gravity at lab temperature (GT):{" "}
        {!Number.isNaN(M_avg) && M_avg}
      </p>
    </main>
  );
}
