import { Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
