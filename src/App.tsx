import { Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Header from "./components/Header";
import Arena from "./pages/Arena";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/arena" element={<Arena />} />
        {/* Add the Arena component */}
      </Routes>
    </>
  );
}

export default App;
