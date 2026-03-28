import { useState } from "react";
import api from "./api";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      const res = await api.post("/auth-service/auth/register", data);
      alert("Registered Successfully: " + res.data);
      setView('HOME');
    } catch (err) {
      console.error(err);
      alert("Registration Error: " + (err.response?.data?.message || err.message || "Unknown error"));
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

        <button onClick={register}>Register</button>
        <button className="text-btn" onClick={() => setView('HOME')}>Back to Home</button>
      </div>
    </div>
  );
}

export default Register;