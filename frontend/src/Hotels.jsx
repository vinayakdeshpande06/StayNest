import { useEffect, useState } from "react";
import api from "./api";

function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    api.get("/admin-service/admin/hotels")
      .then(res => setHotels(res.data))
      .catch(() => alert("Error fetching hotels"));
  }, []);

  return (
    <div>
      <h2>Hotels</h2>
      {hotels.map(h => (
        <div key={h.id}>
          <p>{h.name} - {h.city} - ₹{h.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Hotels;