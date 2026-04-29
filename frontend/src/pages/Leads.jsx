import { useEffect, useState } from "react";
import API from "../api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: ""
  });

   const today = new Date().toISOString().split("T")[0];

const todayLeads = leads.filter((lead) => {
  return (
    lead.followUpDate &&
    lead.followUpDate.split("T")[0] === today
  );
});
  // fetch leads
  const fetchLeads = async () => {
    const res = await API.get("/leads");
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // add lead
  const handleSubmit = async () => {
    await API.post("/leads", form);

    setForm({
      name: "",
      email: "",
      phone: "",
      budget: ""
    });

    fetchLeads();
  };

  // delete lead
  const deleteLead = async (id) => {
    await API.delete(`/leads/${id}`);
    fetchLeads();
  };

  // update status
  const updateStatus = async (id, status) => {
    await API.put(`/leads/${id}`, { status });
    fetchLeads();
  };

  // convert to client
  const convertToClient = async (lead) => {
    await API.post("/clients", {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      sourceLead: lead._id
    });

    alert("Converted to Client");
  };

  
  const filteredLeads = leads.filter((lead) => {
    return (
      lead.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || lead.status === filter)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leads</h1>
      <h2>Today's Follow-ups</h2>

{todayLeads.map((lead) => (
  <div key={lead._id}>
    <p>{lead.name} - {lead.phone}</p>
  </div>
))}

     
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
        <option value="closed">Closed</option>
        <option value="lost">Lost</option>
      </select>

      {/* FORM */}
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          placeholder="Budget"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        />
        <input
  type="date"
  value={form.followUpDate || ""}
  onChange={(e) =>
    setForm({ ...form, followUpDate: e.target.value })
  }
/>

        <button onClick={handleSubmit}>Add Lead</button>
      </div>

      {/* LIST */}
      {filteredLeads.map((lead) => (
        <div
          key={lead._id}
          style={{
            border: "1px solid gray",
            margin: "10px 0",
            padding: "10px"
          }}
        >
          <p><b>Name:</b> {lead.name}</p>
          <p><b>Email:</b> {lead.email}</p>
          <p><b>Phone:</b> {lead.phone}</p>
          <p><b>Budget:</b> {lead.budget}</p>
          <p>
  <b>Follow-up:</b>{" "}
  {lead.followUpDate
    ? new Date(lead.followUpDate).toLocaleDateString()
    : "Not set"}
</p>

          {/* STATUS */}
          <select
            value={lead.status}
            onChange={(e) => updateStatus(lead._id, e.target.value)}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
            <option value="lost">Lost</option>
          </select>

          <br /><br />

          {/* ACTIONS */}
          <button onClick={() => deleteLead(lead._id)}>
            Delete
          </button>

          <button onClick={() => convertToClient(lead)}>
            Convert to Client
          </button>
        </div>
      ))}
    </div>
  );
}

export default Leads;