import React from "react";

import XLSX from "xlsx";

import logo from "./logo.svg";

import "./App.css";

function App() {
  function exportToExcel(e) {
    console.log(e);
    e.preventDefault();

    const data = [
      ["id", "name"],

      ["1", "juan"],

      ["2", "jose"],
    ];

    const sheetName = "sheet1";

    const fileName = `myExcelFle-${Date.now().toString()}.xlsx`;

    const ws = XLSX.utils.aoa_to_sheet(data);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, fileName);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>Export to excel - parent app</p>

        <button onClick={(e) => exportToExcel(e)}>download</button>
        <iframe
          title="export to excel - child app"
          src="http://localhost:5001"
        />
      </header>
    </div>
  );
}

export default App;
