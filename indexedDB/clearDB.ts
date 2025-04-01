"use client";

export const clearIndexedDB = async () => {
  const dbNames = await indexedDB?.databases();
  for (const db of dbNames) {
    if (db.name) {
      await indexedDB.deleteDatabase(db.name);
    }
  }
};
