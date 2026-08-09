import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/layout/Navbar";

import HomePage from "./pages/HomePage";

import TestPage from "./pages/TestPage";
import PertPage from "./pages/PertPage";

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<PertPage />} />

        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
