import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import TanstackTable from "./component/tanstack-table/tanstack-table.component";
import RCTable from "./component/rc-table/rc-table.component";
import AgGridTable from "./component/ag-grid/ag-grid-table.component";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Calculator from "./component/calculator/calculator.component";
import IFrameCalculator from "./component/iframe-calculator/iframe-calculator.component";
import { getPath, paths } from "./const/paths";

ModuleRegistry.registerModules([AllCommunityModule]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TanstackTable />} />
        <Route
          path={getPath(paths.TanstackTablePath)}
          element={<TanstackTable />}
        />
        <Route path={getPath(paths.RCTablePath)} element={<RCTable />} />
        <Route
          path={getPath(paths.AGGridTablePath)}
          element={<AgGridTable />}
        />
        <Route path={getPath(paths.CalculatorPath)} element={<Calculator />} />
        <Route
          path={getPath(paths.IFrameCalculatorPath)}
          element={<IFrameCalculator />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
