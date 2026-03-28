import { useState } from "react";
import api from "./api";

function Register({ setView }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const register = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth-service/auth/register", data);
      alert("Registered Successfully: " + res.data);
      setView('LOGIN');
    } catch (err) {
      console.error(err);
      alert("Registration Error: " + (err.response?.data?.message || err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <div className="form-wrapper">
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <select name="role" onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button onClick={register} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <button className="text-btn" onClick={() => setView('HOME')} disabled={loading}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Register;