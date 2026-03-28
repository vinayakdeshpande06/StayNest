import { useState } from "react";
import api from "./api";

function Login({ onLogin, setView }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "USER"
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await api.post("/auth-service/auth/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login Success");
      // Store id returned by backend so dashboard never needs manual input
      onLogin({ email: data.email, role: data.role, id: res.data.id });
    } catch (err) {
      console.error(err);
      alert("Login Failed: " + (err.response?.data?.message || err.message || "Invalid Credentials"));
    }
  };

  return (
    <div className="container">
      <h2>StayNest Login</h2>
      <div className="form-wrapper">
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        
        <select name="role" onChange={handleChange} value={data.role}>
          <option value="USER">Login as User</option>
          <option value="ADMIN">Login as Admin</option>
        </select>

        <button onClick={login}>Login</button>
        <button className="text-btn" onClick={() => setView('HOME')}>Back to Home</button>
      </div>
    </div>
  );
}

export default Login;