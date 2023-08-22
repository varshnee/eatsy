import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings', { withCredentials: true }).then(response => {
      const formattedBookings = response.data.map(booking => ({
        ...booking,
        formattedDate: formatDate(booking.date)
      }));
      setBookings(formattedBookings);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden p-4">
            <div className="w-48">
              <PlaceImg place={booking.place} />
            </div>
            <div className="py-3 pr-3 grow flex flex-col justify-between">
              <h2 className="text-3xl font-bold">{booking.place.title}</h2>
              <div className="text-xl mt-1">
                <div className="text-xl mb-1">
                  Booking for {booking.count}
                </div>
                <div>
                  At {booking.formattedDate} - {booking.time}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
