// src/lib/services/db.ts
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Ferment, Batch, BatchLog } from '../types';

const DB_NAME = 'MicrozoeDB';
const DB_VERSION = 1;

// Define the schema for the database
interface MicrozoeSchema extends DBSchema {
  ferments: {
    key: string;
    value: Ferment;
    indexes: { 'by-category': string };
  };
  batches: {
    key: string;
    value: Batch;
    indexes: { 'by-ferment': string };
  };
  logs: {
    key: number; // Timestamp + random ID usually, here auto-increment for simplicity
    value: BatchLog & { batchId: string }; // Link log to a batch
    indexes: { 'by-batch': string };
  };
}

// Singleton instance
let dbPromise: Promise<IDBPDatabase<MicrozoeSchema>>;

// Initialize Database
function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<MicrozoeSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Store for Ferment Boards (Kind 37733)
        const fermentStore = db.createObjectStore('ferments', { keyPath: 'id' });
        fermentStore.createIndex('by-category', 'category');

        // Store for Batches/Lotes (Kind 30002 Snapshot)
        const batchStore = db.createObjectStore('batches', { keyPath: 'id' });
        batchStore.createIndex('by-ferment', 'fermentId');

        // Store for History Logs (Kind 30001 Transitions)
        const logStore = db.createObjectStore('logs', { keyPath: 'timestamp' });
        logStore.createIndex('by-batch', 'batchId');
      },
    });
  }
  return dbPromise;
}

// --- Ferment (Board) Operations ---

export async function getAllFerments(): Promise<Ferment[]> {
  const db = await getDB();
  return db.getAll('ferments');
}

export async function getFermentById(id: string): Promise<Ferment | undefined> {
  const db = await getDB();
  return db.get('ferments', id);
}

export async function saveFerment(ferment: Ferment): Promise<void> {
  const db = await getDB();
  await db.put('ferments', ferment);
}

export async function deleteFerment(id: string): Promise<void> {
  const db = await getDB();
  // In a real app, we should transactionally delete related batches too
  const tx = db.transaction(['ferments', 'batches'], 'readwrite');
  
  // 1. Delete the ferment
  await tx.objectStore('ferments').delete(id);
  
  // 2. Find and delete all related batches
  const batchIndex = tx.objectStore('batches').index('by-ferment');
  let cursor = await batchIndex.openCursor(id);
  
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }
  
  await tx.done;
}

// --- Batch (Card) Operations ---

export async function getBatchesByFerment(fermentId: string): Promise<Batch[]> {
  const db = await getDB();
  return db.getAllFromIndex('batches', 'by-ferment', fermentId);
}

export async function saveBatch(batch: Batch): Promise<void> {
  const db = await getDB();
  await db.put('batches', batch);
}

export async function deleteBatch(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('batches', id);
}

// --- Backup Operations (Import/Export) ---

export async function exportDatabase(): Promise<string> {
  const db = await getDB();
  const ferments = await db.getAll('ferments');
  const batches = await db.getAll('batches');
  
  const backup = {
    version: 1,
    timestamp: Date.now(),
    data: {
      ferments,
      batches
    }
  };
  
  return JSON.stringify(backup, null, 2);
}

export async function importDatabase(jsonString: string): Promise<boolean> {
  try {
    const backup = JSON.parse(jsonString);
    const db = await getDB();
    const tx = db.transaction(['ferments', 'batches'], 'readwrite');

    // Clear existing data
    await tx.objectStore('ferments').clear();
    await tx.objectStore('batches').clear();

    // Import new data
    for (const f of backup.data.ferments) {
      await tx.objectStore('ferments').put(f);
    }
    for (const b of backup.data.batches) {
      await tx.objectStore('batches').put(b);
    }

    await tx.done;
    return true;
  } catch (error) {
    console.error('Import failed:', error);
    return false;
  }
}