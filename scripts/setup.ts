import * as SQLite from 'expo-sqlite';
import {
  marathonPreparation,
  websiteProject,
  academicPaper,
  languageLearning,
  readingChallenge,
  photoExhibition,
  certificateExam,
} from '../constants/SampleData';
import {generateUUID} from '../utils/uuid';
import {GoalData, TaskItem} from '@/types/goal';

export const SHOULD_SEED_SAMPLE_DATA = true;
export const SAMPLE_DATA: GoalData[] = [
  academicPaper,
  marathonPreparation,
  // websiteProject,
  // languageLearning,
  // readingChallenge,
  photoExhibition,
  certificateExam,
];

export async function ensureTables(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Goal (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      icon TEXT NOT NULL,
      dDay_date TEXT NOT NULL,
      isCompleted INTEGER NOT NULL
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

export async function insertSampleData(
  db: SQLite.SQLiteDatabase,
  sampleDataArray: GoalData[] = SAMPLE_DATA,
) {
  // 기존 데이터 삭제 (원하면 옵션화 가능)
  await db.runAsync('DELETE FROM TaskItem');
  await db.runAsync('DELETE FROM Goal');

  for (const sampleData of sampleDataArray) {
    const goalId = generateUUID();
    await db.runAsync(
      `INSERT INTO Goal (id, title, icon, dDay_date, isCompleted)
       VALUES (?, ?, ?, ?, ?)`,
      goalId,
      sampleData.title,
      sampleData.icon,
      sampleData.dDay.date,
      0,
    );

    await Promise.all(
      sampleData.achieved.map((t: TaskItem) =>
        db.runAsync(
          `INSERT INTO TaskItem (id, goal_id, text, isCompleted)
           VALUES (?, ?, ?, ?)`,
          t.id,
          goalId,
          t.text,
          1,
        ),
      ),
    );
    await Promise.all(
      sampleData.todos.map((t: TaskItem) =>
        db.runAsync(
          `INSERT INTO TaskItem (id, goal_id, text, isCompleted)
           VALUES (?, ?, ?, ?)`,
          t.id,
          goalId,
          t.text,
          0,
        ),
      ),
    );
  }
}

export async function setupDatabase() {
  try {
    const db = await SQLite.openDatabaseAsync('goalscript.db');
    await ensureTables(db);
    if (SHOULD_SEED_SAMPLE_DATA) {
      await insertSampleData(db, SAMPLE_DATA);
      console.log('Sample data inserted successfully.');
    } else {
      // await db.runAsync('DELETE FROM TaskItem');
      // await db.runAsync('DELETE FROM Goal');
      console.log('Tables ensured, no sample data inserted.');
    }
  } catch (e) {
    console.error('DB Setup Error:', e);
  }
}
