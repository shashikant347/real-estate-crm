import { useEffect, useState } from "react";
import API from "../api";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: ""
  });

  const fetchProperties = async () => {
    const res = await API.get("/properties");
    setProperties(res.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSubmit = async () => {
    await API.post("/properties", form);
    setForm({ title: "", price: "", location: "" });
    fetchProperties();
  };

  const deleteProperty = async (id) => {
    await API.delete(`/properties/${id}`);
    fetchProperties();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Properties</h1>

      {/* FORM */}
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <button onClick={handleSubmit}>Add Property</button>

      {/* LIST */}
      {properties.map((p) => (
        <div key={p._id} style={{ border: "1px solid gray", margin: "10px" }}>
          <p>{p.title}</p>
          <p>{p.price}</p>
          <p>{p.location}</p>
          <button onClick={() => deleteProperty(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Properties;