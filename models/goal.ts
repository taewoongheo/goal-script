import * as SQLite from 'expo-sqlite';

// TypeScript types
export type Goal = {
  id: string;
  title: string;
  icon: string;
  dDay_date: string;
  dDay_remainingDays: number;
};

export type TaskItem = {
  id: string;
  goal_id: string;
  text: string;
  completed: boolean;
  type: 'achieved' | 'todo';
};

export const dbPromise = SQLite.openDatabaseAsync('goalscript.db');

export async function initGoalTables(): Promise<void> {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Goal (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      icon TEXT NOT NULL,
      dDay_date TEXT NOT NULL,
      dDay_remainingDays INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS TaskItem (
      id TEXT PRIMARY KEY NOT NULL,
      goal_id TEXT NOT NULL,
      text TEXT NOT NULL,
      completed INTEGER NOT NULL,
      type TEXT NOT NULL,
      FOREIGN KEY(goal_id) REFERENCES Goal(id)
    );
  `);
}

// Helper to convert boolean to SQLite integer
export function boolToInt(value: boolean): number {
  return value ? 1 : 0;
}

// Helper to convert SQLite integer to boolean
export function intToBool(value: number): boolean {
  return value === 1;
}
