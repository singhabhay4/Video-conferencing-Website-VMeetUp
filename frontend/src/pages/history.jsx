import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // IMPLEMENT SNACKBAR
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="history-container">
      <button className="home-button" onClick={() => routeTo("/home")}>
        🏠 Home
      </button>

      {meetings.length !== 0 &&
        meetings.map((e, i) => (
          <div className="history-card" key={i}>
            <p className="meeting-code">Code: {e.meetingCode}</p>
            <p className="meeting-date">Date: {formatDate(e.date)}</p>
          </div>
        ))}
    </div>
  );
}
