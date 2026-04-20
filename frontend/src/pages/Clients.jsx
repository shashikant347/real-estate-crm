import { useEffect, useState } from "react";
import API from "../api";

function Clients() {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const res = await API.get("/clients");
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Clients</h1>

      {clients.map((c) => (
        <div
          key={c._id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <p><b>Name:</b> {c.name}</p>
          <p><b>Email:</b> {c.email}</p>
          <p><b>Phone:</b> {c.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default Clients;