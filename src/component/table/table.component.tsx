import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./table.component.css";

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

const Table = () => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  console.log("table:", table);
  console.log("table.getAllColumns: ", table.getAllColumns());
  console.log("table.getHeaderGroups: ", table.getHeaderGroups());
  console.log("table.getRowModel()", table.getRowModel());

  return (
    <div className="table-container">
      <table>
        {/* Header render */}

        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
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
    </div>
  );
};

export default Table;
