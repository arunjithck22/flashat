import { openDB, IDBPDatabase } from "idb";

const IMAGE_CACHE_DB_NAME = "media-cache";
const IMAGE_CACHE_STORE_NAME = "images";

// Initialize the IndexedDB database

async function initImageCacheDB(): Promise<IDBPDatabase> {
  return openDB(IMAGE_CACHE_DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(IMAGE_CACHE_STORE_NAME)) {
        db.createObjectStore(IMAGE_CACHE_STORE_NAME);
      }
    },
  });
}

export async function saveImageToCache(
  key: string,
  mediaUrl: string
): Promise<void> {
  const db = await initImageCacheDB();
  await db.put(IMAGE_CACHE_STORE_NAME, mediaUrl, key);
}

// Retrieve the image URL from the cache by key
export async function getImageFromCache(key: string): Promise<string | null> {
  const db = await initImageCacheDB();
  return await db.get(IMAGE_CACHE_STORE_NAME, key); // Return the URL from IndexedDB
}
