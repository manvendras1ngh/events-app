import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Listings from "./components/Listings.jsx";
import Details from "./components/Details.jsx";

const routes = [
  { path: "/", element: <Listings /> },
  { path: "/event/:id", element: <Details /> },
];
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App routes={routes} />
    </BrowserRouter>
  </StrictMode>
);
