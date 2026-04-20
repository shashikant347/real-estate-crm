import { useEffect, useState } from "react";
import API from "../api";

function Deals() {
  const [deals, setDeals] = useState([]);
  const [clients, setClients] = useState([]);
  const [properties, setProperties] = useState([]);

  const [form, setForm] = useState({
    clientId: "",
    propertyId: "",
    amount: "",
    commission: ""
  });

  const fetchData = async () => {
    const dealRes = await API.get("/deals");
    const clientRes = await API.get("/clients");
    const propRes = await API.get("/properties");

    setDeals(dealRes.data);
    setClients(clientRes.data);
    setProperties(propRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    await API.post("/deals", form);
    setForm({ clientId: "", propertyId: "", amount: "", commission: "" });
    fetchData();
  };

  const deleteDeal = async (id) => {
    await API.delete(`/deals/${id}`);
    fetchData();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/deals/${id}`, { status });
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Deals</h1>

      {/* FORM */}
      <select onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
        <option>Select Client</option>
        {clients.map(c => (
          <option value={c._id}>{c.name}</option>
        ))}
      </select>

      <select onChange={(e) => setForm({ ...form, propertyId: e.target.value })}>
        <option>Select Property</option>
        {properties.map(p => (
          <option value={p._id}>{p.title}</option>
        ))}
      </select>

      <input
        placeholder="Amount"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        placeholder="Commission"
        onChange={(e) => setForm({ ...form, commission: e.target.value })}
      />

      <button onClick={handleSubmit}>Create Deal</button>

      {/* LIST */}
      {deals.map(d => (
        <div key={d._id} style={{ border: "1px solid gray", margin: "10px" }}>
          <p><b>Client:</b> {d.clientId?.name}</p>
          <p><b>Property:</b> {d.propertyId?.title}</p>
          <p><b>Amount:</b> {d.amount}</p>
          <p><b>Commission:</b> {d.commission}</p>

          <select
            value={d.status}
            onChange={(e) => updateStatus(d._id, e.target.value)}
          >
            <option value="negotiation">Negotiation</option>
            <option value="agreement">Agreement</option>
            <option value="closed">Closed</option>
          </select>

          <br />

          <button onClick={() => deleteDeal(d._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Deals;