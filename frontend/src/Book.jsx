import { useState } from "react";
import api from "./api";

function Book() {
  const [data, setData] = useState({
    userId: "",
    hotelId: "",
    name: "",
    email: "",
    mobile: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const book = async () => {
    try {
      await api.post("/user-service/user/book", data);
      alert("Booked Successfully");
    } catch (err) {
      alert("Error booking");
    }
  };

  return (
    <div>
      <h2>Book Hotel</h2>

      <input name="userId" placeholder="User ID" onChange={handleChange} />
      <input name="hotelId" placeholder="Hotel ID" onChange={handleChange} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="mobile" placeholder="Mobile" onChange={handleChange} />

      <input type="date" name="startDate" onChange={handleChange} />
      <input type="date" name="endDate" onChange={handleChange} />

      <button onClick={book}>Book</button>
    </div>
  );
}

export default Book;