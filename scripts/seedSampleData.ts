import * as SQLite from 'expo-sqlite';
import {marathonPreparation} from '../constants/SampleData';
import {generateUUID} from '../utils/uuid';

export async function seedSampleGoalData() {
  try {
    const db = await SQLite.openDatabaseAsync('goalscript.db');
    console.log('db load success');

    await db.execAsync('DROP TABLE IF EXISTS TaskItem;');
    await db.execAsync('DROP TABLE IF EXISTS Goal;');
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
        completed INTEGER NOT NULL,
        FOREIGN KEY(goal_id) REFERENCES Goal(id)
      );
    `);

    const goalId = generateUUID();

    await db.runAsync(
      `INSERT INTO Goal (id, title, icon, dDay_date)
       VALUES (?, ?, ?, ?)`,
      goalId,
      marathonPreparation.title,
      marathonPreparation.icon,
      marathonPreparation.dDay.date,
    );

    await Promise.all(
      marathonPreparation.achieved.map(t =>
        db.runAsync(
          `INSERT INTO TaskItem (id, goal_id, text, completed)
           VALUES (?, ?, ?, ?)`,
          t.id,
          goalId,
          t.text,
          1,
        ),
      ),
    );

    await Promise.all(
      marathonPreparation.todos.map(t =>
        db.runAsync(
          `INSERT INTO TaskItem (id, goal_id, text, completed)
           VALUES (?, ?, ?, ?)`,
          t.id,
          goalId,
          t.text,
          0,
        ),
      ),
    );
  } catch (e) {
    console.error('DB Seed Error:', e);
  }
}

// If run directly (node scripts/seedSampleData.ts), execute the function
if (require.main === module) {
  seedSampleGoalData().catch(e => {
    console.error(e);
    process.exit(1);
  });
}
