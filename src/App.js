import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/layout/Navbar";

import HomePage from "./pages/HomePage";
//import ContactPage from "./pages/ContactPage";
import TestPage from "./pages/TestPage";
//import CoursesPage from "./pages/CoursesPage";

function App() {
  return (
    <div className="w-full">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
