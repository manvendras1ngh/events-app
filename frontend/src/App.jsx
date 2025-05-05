import { Routes, Route } from "react-router-dom";
import "./App.css";

function App({ routes }) {
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;
