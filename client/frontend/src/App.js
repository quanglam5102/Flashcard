import React, {useState, useEffect, useRef} from 'react'
import PrimarySearchAppBar from "./PrimarySearchAppBar"
import { Outlet } from "react-router-dom";
import './app.css'

function App() {
    return (
    <div>
      <PrimarySearchAppBar />
      <div style={{ padding: "20px" }}>
        <Outlet /> {/* Nested route content appears here */}
      </div>
    </div>
  );
}

export default App