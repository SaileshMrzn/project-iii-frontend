"use client";
import { useEffect, useState } from "react";

export default function ServerLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV === "development") {
      setLoading(false);
      return;
    }
    fetch("https://project-iii-backend.onrender.com/")
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <p className="text-lg px-6 md:px-16">Server Loading, Please Wait...</p>
    </div>
  );
}
