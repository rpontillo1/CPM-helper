import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import TestPage from "./pages/TestPage";
import PertPage from "./pages/PertPage";

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pert" element={<PertPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
