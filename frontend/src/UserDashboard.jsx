import { useState, useEffect } from "react";
import api from "./api";

const emptyForm = () => ({ name: "", mobile: "", startDate: "", endDate: "" });

function BookingSuccess({ booking, hotel, onBack }) {
  const nights =
    booking.startDate && booking.endDate
      ? Math.max(
          1,
          Math.round(
            (new Date(booking.endDate) - new Date(booking.startDate)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;
  const total = hotel ? hotel.price * nights : 0;

  return (
    <div className="container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2>Booking Confirmed!</h2>
        <p className="success-subtitle">
          Thank you, <strong>{booking.name}</strong>! Your booking is on its way.
        </p>

        <div className="booking-details-grid">
          <div className="detail-row">
            <span className="detail-label">🏨 Hotel</span>
            <span className="detail-value">{hotel?.name || "—"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📍 City</span>
            <span className="detail-value">{hotel?.city || "—"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">👤 Name</span>
            <span className="detail-value">{booking.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📧 Email</span>
            <span className="detail-value">{booking.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📱 Mobile</span>
            <span className="detail-value">{booking.mobile}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📅 Check-In</span>
            <span className="detail-value">{booking.startDate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📅 Check-Out</span>
            <span className="detail-value">{booking.endDate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">🌙 Nights</span>
            <span className="detail-value">{nights}</span>
          </div>
          <div className="detail-row highlight-row">
            <span className="detail-label">💰 Total</span>
            <span className="detail-value">₹{total.toLocaleString()}</span>
          </div>
        </div>

        <p className="success-email-note">
          A confirmation email has been sent to <strong>{booking.email}</strong>.
        </p>

        <button className="back-btn" onClick={onBack}>
          ← Book Another Hotel
        </button>
      </div>
    </div>
  );
}

function UserDashboard({ user, setView }) {
  const [hotels, setHotels] = useState([]);
  const [forms, setForms] = useState({});
  // Track loading per hotel: { hotelId: boolean }
  const [loading, setLoading] = useState({});
  // When set, show success screen
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get("/admin-service/admin/hotels");
        const visible = res.data.filter((h) => h.visible);
        setHotels(visible);
        const initial = {};
        visible.forEach((h) => {
          initial[h.id] = emptyForm();
        });
        setForms(initial);
      } catch (err) {
        console.error("Error fetching hotels", err);
      }
    };
    fetchHotels();
  }, []);

  const handleChange = (hotelId, e) => {
    setForms((prev) => ({
      ...prev,
      [hotelId]: { ...prev[hotelId], [e.target.name]: e.target.value },
    }));
  };

  const bookHotel = async (hotel) => {
    const form = forms[hotel.id] || {};
    if (!form.name || !form.mobile || !form.startDate || !form.endDate) {
      alert("Please fill all details: Name, Mobile, Start Date, End Date.");
      return;
    }

    const payload = {
      userId: user.id,
      hotelId: hotel.id,
      name: form.name,
      email: user.email,
      mobile: form.mobile,
      startDate: form.startDate,
      endDate: form.endDate,
    };

    // ── Loading ON ──
    setLoading((prev) => ({ ...prev, [hotel.id]: true }));

    try {
      await api.post("/user-service/user/book", payload);

      // Reset only this hotel's form
      setForms((prev) => ({ ...prev, [hotel.id]: emptyForm() }));

      // Show success screen
      setSuccessData({ booking: payload, hotel });
    } catch (err) {
      alert("Booking failed: " + (err.response?.data?.message || err.message));
    } finally {
      // ── Loading OFF ──
      setLoading((prev) => ({ ...prev, [hotel.id]: false }));
    }
  };

  // ── Success Screen ──
  if (successData) {
    return (
      <BookingSuccess
        booking={successData.booking}
        hotel={successData.hotel}
        onBack={() => setSuccessData(null)}
      />
    );
  }

  // ── Main Dashboard ──
  return (
    <div className="container">
      <h2>User Dashboard</h2>
      <div className="user-info">
        <p>
          Welcome, <strong>{user.email}</strong>
        </p>
        <p style={{ color: "#888", fontSize: "0.85rem" }}>
          User ID: <strong>{user.id}</strong> &nbsp;|&nbsp; Role: {user.role}
        </p>
      </div>

      <section>
        <h3>Available Hotels</h3>
        <div className="hotel-list">
          {hotels.map((h) => {
            const form = forms[h.id] || emptyForm();
            const isLoading = loading[h.id] || false;
            return (
              <div key={h.id} className="hotel-card">
                <h4>{h.name}</h4>
                <p>
                  {h.city} – ₹{h.price} per night
                </p>
                <div className="booking-form-inline">
                  <input
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => handleChange(h.id, e)}
                    disabled={isLoading}
                  />
                  <input
                    name="mobile"
                    placeholder="Mobile Number"
                    value={form.mobile}
                    onChange={(e) => handleChange(h.id, e)}
                    disabled={isLoading}
                  />
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={(e) => handleChange(h.id, e)}
                    disabled={isLoading}
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={(e) => handleChange(h.id, e)}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => bookHotel(h)}
                    disabled={isLoading}
                    className={isLoading ? "btn-loading" : ""}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner" /> Booking…
                      </>
                    ) : (
                      "Book Now"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
