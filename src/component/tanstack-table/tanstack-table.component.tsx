import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import "./tanstack-table.component.css";
import { useState } from "react";

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

  return (
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
    </div>
  );
};

export default TanstackTable;
