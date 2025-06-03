import * as SQLite from 'expo-sqlite';

export const dbPromise = SQLite.openDatabaseAsync('goalscript.db');

export async function initGoalTables(): Promise<void> {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Goal (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      icon TEXT NOT NULL,
      dDay_date TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS TaskItem (
      id TEXT PRIMARY KEY NOT NULL,
      goal_id TEXT NOT NULL,
      text TEXT NOT NULL,
      isCompleted INTEGER NOT NULL,
      FOREIGN KEY(goal_id) REFERENCES Goal(id)
    );
  `);
}

export function boolToInt(value: boolean): number {
  return value ? 1 : 0;
}

export function intToBool(value: number): boolean {
  return value === 1;
}
