import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import "./tanstack-table.component.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { hotkeys } from "../../const/hotkeys/hotkeys";
import { saveFile } from "../../const/hotkeys/defaultHotkeysHandler";
import { getPath, paths } from "../../const/paths";

const data = [
  { firstName: "John", age: 40, secondName: "Doe" },
  { firstName: "Alice", age: 28 },
  { firstName: "Bob", age: 32 },
  { firstName: "Charlie", age: 24 },
];

const columns = [
  {
    header: "Default header",
    columns: [{ accessorKey: "age", header: "Age", size: 100 }],
  },
  {
    header: "Group header",
    columns: [
      { accessorKey: "firstName", header: "First name", size: 200 },
      { accessorKey: "secondName", header: "Second name", size: 100 },
    ],
  },
];

const TanstackTable = () => {
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [inputText, setInputText] = useState("");

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  // console.log("table:", table);
  // console.log("table.getAllColumns: ", table.getAllColumns());
  // console.log("table.getHeaderGroups: ", table.getHeaderGroups());
  // console.log("table.getRowModel()", table.getRowModel());
  // console.log("sorting: ", table.getState().sorting);

  const setSortAgeDesc = () => {
    setSorting([{ id: "age", desc: true }]);
  };

  const setSortAgeAsc = () => {
    setSorting([{ id: "age", desc: false }]);
  };

  useHotkeys(hotkeys.CtrlS, (e) => saveFile(e));

  useHotkeys(hotkeys.CtrlZ, (e) => setInputText(""));

  useHotkeys(hotkeys.ArrowUp, () => setSortAgeDesc());

  useHotkeys(hotkeys.ArrowDown, () => setSortAgeAsc());

  // for MacOS cmd (meta is cmd)
  useHotkeys(hotkeys.MetaS, (e) => saveFile(e));

  // TODO
  useHotkeys(hotkeys.CtrlA, () => alert("CtrlA"));
  useHotkeys(hotkeys.CtrlC, () => alert("CtrlC"));
  useHotkeys(hotkeys.CtrlV, () => alert("CtrlV"));
  useHotkeys(hotkeys.CtrlY, () => alert("CtrlY"));
  useHotkeys(hotkeys.CtrlF, () => alert("CtrlF"));
  useHotkeys(hotkeys.Enter, () => alert("Enter"));

  useEffect(() => {
    console.log("inputText:", inputText);
  }, [inputText]);

  return (
    <div className="">
      <div className="links-block">
        <Link to={getPath(paths.RCTablePath)}>RC table</Link>
        <Link to={getPath(paths.AGGridTablePath)}>AG-Grid table</Link>
        <Link to={getPath(paths.CalculatorPath)}>Calculator</Link>
        <Link to={getPath(paths.IFrameCalculatorPath)}>IFrame-calculator</Link>
      </div>

      <div className="table-container">
        <table>
          {/* Header render */}

          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                onClick={() => setSorting([{ id: "age", desc: false }])}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {/* Resize-handle */}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body render */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="" onClick={setSortAgeAsc}>
          sort age asc
        </div>

        <div className="" onClick={setSortAgeDesc}>
          sort age desc
        </div>

        <input
          type="text"
          placeholder="for keydown"
          onKeyDown={(e) => console.log(e)}
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
      </div>
    </div>
  );
};

export default TanstackTable;
