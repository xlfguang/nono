import { Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Header from "./components/Header";
import Arena from "./pages/Arena";
import DashboardTow from "./pages/dashboard2";
import { UserContextProvider } from "@/components/userContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/dashboard2" element={<DashboardTow />} />

          {/* Add the Arena component */}
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
