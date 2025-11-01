import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import CreateCard from "./CreateCard";
import Home from './Home.js';
import UpdateCard from './UpdateCard.js';
import AllCards from "./AllCards";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* Nested routes inside App */}
        <Route index element={<Home />} />
        <Route path="create-card" element={<CreateCard />} />
        <Route path="all-cards" element={<AllCards />} />
        <Route path="update-card/:id" element={<UpdateCard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

