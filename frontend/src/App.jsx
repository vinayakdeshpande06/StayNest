import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import "./style.css";

function App() {
  const [view, setView] = useState(() => localStorage.getItem('view') || 'HOME');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const handleLogin = (userData) => {
    console.log("Login User Data:", userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    if (userData.role === 'ADMIN') {
      console.log("Redirecting to Admin Dashboard");
      setView('ADMIN_DASHBOARD');
      localStorage.setItem('view', 'ADMIN_DASHBOARD');
    } else {
      console.log("Redirecting to User Dashboard");
      setView('USER_DASHBOARD');
      localStorage.setItem('view', 'USER_DASHBOARD');
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setView('HOME');
  };

  const navigate = (v) => {
    setView(v);
    localStorage.setItem('view', v);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="brand" onClick={() => navigate('HOME')}>StayNest</div>
        {user ? (
          <button className="logout-btn" onClick={logout}>Logout ({user.role})</button>
        ) : (
          <div className="nav-links">
            <button className="text-btn" onClick={() => navigate('LOGIN')}>Login</button>
            <button className="text-btn" onClick={() => navigate('REGISTER')}>Register</button>
          </div>
        )}
      </nav>

      <main>
        {view === 'HOME' && <Home setView={navigate} />}
        {view === 'REGISTER' && <Register setView={navigate} />}
        {view === 'LOGIN' && <Login onLogin={handleLogin} setView={navigate} />}
        {view === 'ADMIN_DASHBOARD' && user && <AdminDashboard user={user} setView={navigate} />}
        {view === 'USER_DASHBOARD' && user && <UserDashboard user={user} setView={navigate} />}
      </main>

      <footer className="footer">
        <p>&copy; 2026 StayNest. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;