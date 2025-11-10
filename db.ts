import type { StoredFeedback } from './types';

const DB_NAME = 'FeedbackDB';
const DB_VERSION = 1;
const STORE_NAME = 'feedbacks';

let db: IDBDatabase;

const openDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Error opening IndexedDB:', request.error);
      reject('Error opening IndexedDB');
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

export const addFeedback = async (feedback: Omit<StoredFeedback, 'id'>): Promise<void> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(feedback);

    request.onsuccess = () => resolve();
    request.onerror = () => {
      console.error('Error adding feedback to DB:', request.error);
      reject('Error adding feedback');
    };
  });
};

export const getAllFeedbacks = async (): Promise<StoredFeedback[]> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
        // Sort by date descending to show newest first
        const resultsWithDateObjects = request.result.map(r => ({ ...r, date: new Date(r.date) }));
        const sortedResults = resultsWithDateObjects.sort((a, b) => b.date.getTime() - a.date.getTime());
        resolve(sortedResults);
    };
    request.onerror = () => {
      console.error('Error getting feedbacks from DB:', request.error);
      reject('Error getting feedbacks');
    };
  });
};
