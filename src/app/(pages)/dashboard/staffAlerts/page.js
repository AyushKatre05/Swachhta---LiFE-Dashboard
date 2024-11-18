'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession hook

const Alerts = () => {
  const { data: session, status } = useSession(); // Get session data
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      // Only fetch alerts if user is logged in
      if (session?.user?.id) {
        const url = `/api/alerts?assignedTo=${session.user.id}`; // Use user id from session

        try {
          const res = await fetch(url);
          const data = await res.json();

          if (data.success) {
            // Filter alerts to only show the ones assigned to the current user
            const userAlerts = data.alerts.filter(alert => alert.assignedTo?._id === session.user.id);
            setAlerts(userAlerts);
          } else {
            console.error("Error fetching alerts:", data.error);
          }
        } catch (error) {
          console.error("Error fetching alerts:", error);
        }
      }
    };

    if (status === "authenticated") {
      fetchAlerts();
    }
  }, [session, status]); // Trigger useEffect whenever session or authentication status changes

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Please log in to view alerts.</p>;
  }

  return (
    <div>
      <ul>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <li key={alert._id}>
              <p>{alert.message}</p>
              <p>{alert.area}</p>
              <p>{alert.status}</p>
              <p>{alert.assignedTo?.name}</p>
            </li>
          ))
        ) : (
          <p>No alerts assigned to you.</p>
        )}
      </ul>
    </div>
  );
};

export default Alerts;
