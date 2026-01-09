"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";

export default function ApplicationsPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    apiFetch("/applications").then((res) => {
      if (res.success) setApps(res.applications);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Applications</h1>

      {apps.map((app) => (
        <div key={app._id} className="border p-4 mb-3 rounded">
          <h2>{app.job.title}</h2>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}
