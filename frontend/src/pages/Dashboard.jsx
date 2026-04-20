import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [leads, setLeads] = useState(0);
  const [properties, setProperties] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const leadRes = await API.get("/leads");
    const propRes = await API.get("/properties");

    setLeads(leadRes.data.length);
    setProperties(propRes.data.length);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h2>Total Leads</h2>
          <p>{leads}</p>
        </div>

        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h2>Total Properties</h2>
          <p>{properties}</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;