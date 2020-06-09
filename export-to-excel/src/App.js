import React, { Component } from "react";

import XLSX from "xlsx";

import logo from "./logo.svg";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.exportToExcel = this.exportToExcel.bind(this);
  }

  exportToExcel(e) {
    e.preventDefault();
    let data = [
      ["id", "name"],

      ["1", "juan"],

      ["2", "jose"],
    ];

    let sheetName = "sheet1";
    let fileName = `myExcelFle-${Date.now().toString()}.xlsx`;

    let wb = XLSX.utils.book_new();

    let ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    console.log(wb);
    //  let b =  new Blob([], {type : 'application/json'});
    let wopts = { bookType: "xlsx", bookSST: false, type: "array" };

    let wbout = XLSX.write(wb, wopts);

    let b = new Blob([wbout], { type: "application/octet-stream" });
    downloadBlob(b, fileName);
    // XLSX.writeFile(wb, fileName);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>Export to excel - child app</p>

          <button onClick={this.exportToExcel}>download</button>
        </header>
      </div>
    );
  }
}

export default App;

function downloadBlob(blob, filename) {
  // Create an object URL for the blob object
  const url = URL.createObjectURL(blob);

  // Create a new anchor element
  const a = document.createElement("a");

  // Set the href and download attributes for the anchor element
  // You can optionally set other attributes like `title`, etc
  // Especially, if the anchor element will be attached to the DOM
  a.href = url;
  a.download = filename || "download";

  // Click handler that releases the object URL after the element has been clicked
  // This is required for one-off downloads of the blob content
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };

  // Add the click event listener on the anchor element
  // Comment out this line if you don't want a one-off download of the blob content
  a.addEventListener("click", clickHandler, false);

  // Programmatically trigger a click on the anchor element
  // Useful if you want the download to happen automatically
  // Without attaching the anchor element to the DOM
  // Comment out this line if you don't want an automatic download of the blob content
  a.click();

  // Return the anchor element
  // Useful if you want a reference to the element
  // in order to attach it to the DOM or use it in some other way
  return a;
}
