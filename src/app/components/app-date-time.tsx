"use client";

import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export default function AppDateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(dateTime);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateTime);

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <Calendar className="h-4 w-4" />
      <span>
        {formattedDate} - {formattedTime}
      </span>
    </div>
  );
}
