"use client";
import { Calendar } from "lucide-react";
import { useState } from "react";

interface AddToCalendarProps {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
}

const AddToCalendar = ({
  title,
  description,
  location,
  date,
  time,
}: AddToCalendarProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToGoogleCalendar = () => {
    const eventDate = new Date(`${date} ${time}`);
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);

    const formatDate = (d: Date) => {
      return d.toISOString().replace(/-|:|\.\d+/g, "");
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formatDate(eventDate)}/${formatDate(
      endDate
    )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
      location
    )}`;

    window.open(googleCalendarUrl, "_blank");
    setShowPopup(false);
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="add-calendar-button"
        type="button"
      >
        <Calendar className="w-5 h-5" />
        Add to Calendar
      </button>

      {showPopup && (
        <div
          className="calendar-popup-overlay"
          onClick={() => setShowPopup(false)}
        >
          <div className="calendar-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Add</h3>
            <p>Would you like to add this event to your Google Calendar?</p>
            <div className="calendar-popup-actions">
              <button
                onClick={handleAddToGoogleCalendar}
                className="calendar-popup-confirm"
              >
                Add
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="calendar-popup-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCalendar;
