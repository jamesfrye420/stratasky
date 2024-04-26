"use client";
import { GridDataProvider, useGridData } from "@/components/context/gridData";
import Grid from "@/components/ui/agGrid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const ColumnDefinations = [
  {
    field: "id",
    hide: true,
  },
  {
    field: "params",
    headerName: "Parameters",
    suppressSizeToFit: true,
    pinned: "left",
  },
  {
    field: "1",
    editable: true,
    minWidth: 400,
  },
  {
    field: "2",
    editable: true,
    minWidth: 400,
  },
  {
    field: "3",
    editable: true,
    minWidth: 400,
  },
];

const RowData = [
  {
    id: "1",
    params: "Initial Reading (R1) (degree)",
    1: 0,
  },
  {
    id: "2",
    params: "Final Reading (R2) (degree)",
    1: 30,
  },
  {
    id: "3",
    params: "Diameter of Vanes (D) (cm)",
    1: 3.75,
  },
  {
    id: "4",
    params: "Height of Vanes (H) (cm)",
    1: 7.5,
  },
];

export default function HomePage() {
  const { colDefs, rowData, setColDefs, setRowData } = useGridData();

  const [gridReady, setGridReady] = useState(false);
  const [dummy, setDummy] = useState<Number>(0);
  const [k, setK] = useState<number>(4);
  const [T1, setT1] = useState<Number>();
  const [T2, setT2] = useState<Number>();
  const [T3, setT3] = useState<Number>();
  const [cu1, setCu1] = useState<string>();
  const [cu2, setCu2] = useState<string>();
  const [cu3, setCu3] = useState<string>();

  const [cu_avg, setCu_avg] = useState<string>();

  const gridRef = useRef<AgGridReact>();

  const autoSizeStrategy = useMemo(() => {
    return {
      type: "fitCellContents",
    };
  }, []);

  useEffect(() => {
    setColDefs(ColumnDefinations);
    setRowData(RowData);
  }, []);

  useEffect(() => {
    if (k) {
      const torque1 =
        k *
        +(
          (+gridRef.current?.api?.getRowNode("2")?.data[1] -
            +gridRef.current?.api?.getRowNode("1")?.data[1]) /
          180
        ).toFixed(2);
      setT1(torque1);
      const torque2 =
        k *
        +(
          (+gridRef.current?.api?.getRowNode("2")?.data[2] -
            +gridRef.current?.api?.getRowNode("1")?.data[2]) /
          180
        ).toFixed(2);
      setT2(torque2);
      const torque3 =
        k *
        +(
          (+gridRef.current?.api?.getRowNode("2")?.data[3] -
            +gridRef.current?.api?.getRowNode("1")?.data[3]) /
          180
        ).toFixed(2);
      setT3(torque3);

      if (T1) {
        const cohesion1 =
          +T1 /
          (Math.PI *
            Math.pow(+gridRef.current?.api?.getRowNode("3")?.data[1], 2) *
            (+gridRef.current?.api?.getRowNode("3")?.data[1] / 6 +
              +gridRef.current?.api?.getRowNode("4")?.data[1] / 2));

        setCu1(cohesion1.toFixed(5));
      }
      if (T2) {
        const cohesion2 =
          +T2 /
          (Math.PI *
            Math.pow(+gridRef.current?.api?.getRowNode("3")?.data[2], 2) *
            (+gridRef.current?.api?.getRowNode("3")?.data[2] / 6 +
              +gridRef.current?.api?.getRowNode("4")?.data[2] / 2));

        setCu2(cohesion2.toFixed(5));
      }
      if (T3) {
        const cohesion3 =
          +T3 /
          (Math.PI *
            Math.pow(+gridRef.current?.api?.getRowNode("3")?.data[3], 2) *
            (+gridRef.current?.api?.getRowNode("3")?.data[3] / 6 +
              +gridRef.current?.api?.getRowNode("4")?.data[3] / 2));

        setCu3(cohesion3.toFixed(5));
      }
      // @ts-ignore
      const cu_arr = [+cu1, +cu2, +cu3];
      const numCu_arr = cu_arr.filter((num) => !Number.isNaN(num));

      const Cusum = numCu_arr.reduce((a, b) => a + b, 0);
      const Cuavg = (Cusum / numCu_arr.length).toFixed(5);

      setCu_avg(Cuavg);
    }
  }, [dummy, gridReady, k, T1, T2, T3, cu1, cu2, cu3]);

  return (
    <main className="">
      <h1 className="mb-10 text-3xl font-semibold tracking-wide">Vane Shear</h1>
      <div className="flex items-center justify-start gap-4">
        <Label htmlFor="springConstant" className="w-fit">
          Spring Constant (kg/cm<sup>2</sup>)
        </Label>
        <Input
          type="number"
          id="springConstant"
          value={k}
          onChange={(event) => setK(+event.currentTarget.value)}
          className="my-2 w-60 py-2"
        />
      </div>
      <Grid
        autoSizeStrategy={autoSizeStrategy as any}
        setDummy={setDummy}
        ref={gridRef}
        setGridReady={setGridReady as any}
      />
      <div className="mt-10 flex justify-evenly">
        <p>
          Torque for test 1 [kgf-cm] : {!Number.isNaN(T1) ? String(T1) : ""}
        </p>
        <p>Torque for test 2 [kgf-cm]: {!Number.isNaN(T2) ? String(T2) : ""}</p>
        <p>
          Torque for test 3 [kgf-cm] : {!Number.isNaN(T3) ? String(T3) : ""}
        </p>
      </div>
      <div className="mt-10 flex justify-evenly">
        <p>
          Cu for test 1 [kg/cm<sup>2</sup>]: {cu1 && cu1 !== "NaN" ? cu1 : ""}
        </p>
        <p>
          Cu for test 2 [kg/cm<sup>2</sup>]: {cu2 && cu2 !== "NaN" ? cu2 : ""}
        </p>
        <p>
          Cu for test 3 [kg/cm<sup>2</sup>]: {cu3 && cu3 !== "NaN" ? cu3 : ""}
        </p>
      </div>
      <div className="mt-10 flex justify-evenly">
        <p>
          Cu avg [kg/cm<sup>2</sup>]: {cu_avg && cu_avg !== "NaN" ? cu_avg : ""}
        </p>
      </div>
    </main>
  );
}
