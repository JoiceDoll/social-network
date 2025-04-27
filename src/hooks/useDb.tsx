import { useEffect, useState } from "react";
import { getDB } from "../db/db";

export const useGetDb = (storeName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await getDB();
        const allData = await db.getAll(storeName);
        setData(allData);
      } catch (err) {
        console.error("Error fetching data from IndexedDB:", err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [storeName]);

  const clearStore = async () => {
    try {
      const db = await getDB();
      await db.clear(storeName);
      setData([]);
    } catch (err) {
      console.error("Error clearing store:", err);
      setError("Failed to clear store");
    }
  };

  return { data, error, clearStore };
};
