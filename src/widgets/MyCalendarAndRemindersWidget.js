import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { BsEmojiSunglasses, BsTrash } from "react-icons/bs";
import "../styles/styles.css";

export default function MyCalendarAndRemindersWidget() {
  const [reminders, setReminders] = useState(() => {
    return JSON.parse(localStorage.getItem("reminderList")) || [];
  });

  const handleOnClickDay = (value) => {
    const reminderTitle = prompt("Add reminder");
    if (reminderTitle) {
      setReminders([
        ...reminders,
        {
          title: reminderTitle,
          date: new Date(value).toLocaleDateString(),
          completed: false,
        },
      ]);
    }
  };

  const toggleReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders[index].completed = !updatedReminders[index].completed;
    setReminders(updatedReminders);
  };

  const handleOnClickDelete = (title) => {
    const updatedReminders = reminders.filter(
      (reminder) => reminder.title !== title
    );
    setReminders(updatedReminders);
  };

  useEffect(() => {
    const storedReminders = localStorage.getItem("reminderList");
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reminderList", JSON.stringify(reminders));
  }, [reminders]);

  return (
    <div style={{ minWidth: 300 }}>
      <Calendar
        style={{ width: 300, color: "black" }}
        onClickDay={handleOnClickDay}
      />
      <hr style={{ margin: "16px 0 " }} />
      <h2 style={{ marginBottom: "8px" }}>Reminders</h2>
      {reminders.length > 0 ? (
        <ul style={{ listStyle: "none" }}>
          {reminders.map((reminder, index) => (
            <li
              key={reminder.date}
              style={
                reminder.completed
                  ? {
                      textDecoration: "line-through",
                      display: "flex",
                      justifyContent: "space-between",
                    }
                  : { display: "flex", justifyContent: "space-between" }
              }
            >
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  checked={reminder.completed}
                  onChange={() => toggleReminder(index)}
                  style={{ marginRight: "8px", transform: "scale(1.2)" }}
                />
                <p style={{ maxWidth: "313px" }}>
                  {reminder.title} - {reminder.date}
                </p>
              </div>
              <button
                onClick={() => handleOnClickDelete(reminder.title)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <BsTrash />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ display: "flex" }}>
          You don't have anything to do... <BsEmojiSunglasses />
        </p>
      )}
    </div>
  );
}
