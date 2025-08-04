import { useState } from "react";
import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  GridOptions,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const generateRandomData = (itemsCount: number) => {
  const makesList = ["Toyota", "Ford", "BMW", "Audi", "Honda"];
  const modelsList = ["Camry", "Focus", "X5", "A4", "Civic"];
  const colorsList = ["Red", "Blue", "Silver", "Black", "White"];

  return Array.from({ length: itemsCount }, (_, i) => ({
    id: i + 1,
    make: makesList[Math.floor(Math.random() * makesList.length)],
    model: modelsList[Math.floor(Math.random() * modelsList.length)],
    price: Math.floor(Math.random() * 90000) + 10000,
    year: Math.floor(Math.random() * 10) + 2015,
    color: colorsList[Math.floor(Math.random() * colorsList.length)],
    sold: Math.random() > 0.5,
    electric: false,
  }));
};

const AgGridTable = () => {
  const [rowData] = useState(generateRandomData(100));

  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Make & Model",
      children: [
        {
          field: "make",
          sortable: true,
          filter: true,
        },
        {
          field: "model",
          filter: "agTextColumnFilter",
        },
      ],
    },
    {
      headerName: "Price & Year",
      children: [
        {
          field: "price",
          filter: "agNumberColumnFilter",
          valueFormatter: (params) => `$${params.value.toLocaleString()}`,
        },
        {
          field: "year",
          filter: "agNumberColumnFilter",
        },
      ],
    },
    {
      field: "color",
      filter: "agSetColumnFilter",
      width: 500,
      resizable: false,
      suppressSizeToFit: false,
      lockPosition: true,
      lockVisible: true,
    },
  ]);

  const gridOptions: GridOptions = {
    rowSelection: "multiple",
    pagination: true,
    paginationPageSize: 20,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default AgGridTable;
