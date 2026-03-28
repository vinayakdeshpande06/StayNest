import { useState, useEffect } from "react";
import api from "./api";

function AdminDashboard({ user, setView }) {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "",
    address: "",
    availableRooms: "",
    price: "",
    visible: true
  });

  const fetchHotels = async () => {
    try {
      const res = await api.get("/admin-service/admin/hotels");
      setHotels(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setNewHotel({ ...newHotel, [e.target.name]: value });
  };

  const addHotel = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin-service/admin/hotels", newHotel);
      alert("Hotel Added Successfully!");
      setNewHotel({ name: "", city: "", address: "", availableRooms: "", price: "", visible: true });
      fetchHotels();
    } catch (err) {
      alert("Failed to add hotel: " + (err.response?.data?.message || err.message));
    }
  };

  const deleteHotel = async (id) => {
    if (window.confirm("Delete this hotel?")) {
      try {
        await api.delete(`/admin-service/admin/hotels/${id}`);
        fetchHotels();
      } catch (err) {
        alert("Fail to delete");
      }
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>Logged in as: {user.email}</p>

      <section className="form-section">
        <h3>Add New Hotel</h3>
        <form onSubmit={addHotel}>
          <input name="name" placeholder="Hotel Name" value={newHotel.name} onChange={handleChange} required />
          <input name="city" placeholder="City" value={newHotel.city} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={newHotel.address} onChange={handleChange} required />
          <input type="number" name="availableRooms" placeholder="Available Rooms" value={newHotel.availableRooms} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price per Night" value={newHotel.price} onChange={handleChange} required />
          <label>
            <input type="checkbox" name="visible" checked={newHotel.visible} onChange={handleChange} />
            Visible to Users
          </label>
          <button type="submit">Add Hotel</button>
        </form>
      </section>

      <section>
        <h3>Registered Hotels</h3>
        <div className="hotel-list">
          {hotels.map(h => (
            <div key={h.id} className="hotel-card">
              <h4>{h.name}</h4>
              <p>{h.city} - ₹{h.price} ({h.availableRooms} rooms)</p>
              <button className="danger" onClick={() => deleteHotel(h.id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
