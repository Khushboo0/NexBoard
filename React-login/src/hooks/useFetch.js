import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800)); // simulate delay

        let mockData = null;

        if (url.includes("/api/dashboard/stats")) {
          mockData = {
            totalUsers: 1250,
            activeUsers: 870,
            newUsersToday: 24,
            totalRevenue: 189320,
          };
        } else if (url.includes("/api/users")) {
          mockData = [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              role: "Admin",
              status: "active",
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane@example.com",
              role: "Editor",
              status: "active",
            },
            {
              id: 3,
              name: "Mike Johnson",
              email: "mike@example.com",
              role: "User",
              status: "inactive",
            },
            {
              id: 4,
              name: "Sarah Williams",
              email: "sarah@example.com",
              role: "User",
              status: "active",
            },
            {
              id: 5,
              name: "Robert Brown",
              email: "robert@example.com",
              role: "Editor",
              status: "active",
            },
          ];
        }

        if (isMounted) {
          setData(mockData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
