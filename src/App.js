import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/layout/Navbar";

import HomePage from "./pages/HomePage";

import TestPage from "./pages/TestPage";
import PertPage from "./pages/PertPage";

function App() {
  return (
    <div className="w-full">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pert" element={<PertPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
