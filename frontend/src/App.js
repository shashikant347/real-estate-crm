import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Properties from "./pages/Properties";
import Clients from "./pages/Clients";
import Login from "./pages/Login";
import Deals from "./pages/Deals";

function App() {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState("dashboard");

  if (!token) return <Login />;

  return (
    <div>
      {/* NAVBAR */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("deals")}>Deals</button>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("leads")}>Leads</button>
        <button onClick={() => setPage("properties")}>Properties</button>
        <button onClick={() => setPage("clients")}>Clients</button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

      {/* PAGES */}
      {page === "dashboard" && <Dashboard />}
      {page === "leads" && <Leads />}
      {page === "properties" && <Properties />}
      {page === "clients" && <Clients />}
      {page === "deals" && <Deals />}
    </div>
  );
}

export default App;