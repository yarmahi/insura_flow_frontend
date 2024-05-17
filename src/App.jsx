import { useState } from "react";
import Navbar from "./components/Navbar/index";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Admin from "./Layouts/admin";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/admin/*" element={<Admin />} />

        <Route
          path="/side"
          element={<Sidebar open={open} onClose={() => setOpen(false)} />}
        />
      </Routes>
    </div>
  );
}

export default App;