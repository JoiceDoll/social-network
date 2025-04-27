import { openDB } from "idb";

export const getDB = () =>
  openDB("FakeAuthDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "username" });
      }
    },
  });
