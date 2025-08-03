import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import TanstackTable from "./component/tanstack-table/tanstack-table.component";
import RCTable from "./component/rc-table/rc-table.component";
import AgGridTable from "./component/ag-grid/ag-grid-table.component";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TanstackTable />} />
        <Route path="/tanstack-table" element={<TanstackTable />} />
        <Route path="/rc-table" element={<RCTable />} />
        <Route path="/ag-grid-table" element={<AgGridTable />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
