import { useState } from "react";
import API from "../api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      // token save
      localStorage.setItem("token", res.data.token);

      alert("Login Success");
      window.location.href = "/";
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;