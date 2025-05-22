import {dbPromise} from './goal';

export async function prepareInsertGoal() {
  const db = await dbPromise;
  return db.prepareAsync(
    `INSERT INTO Goal (id, title, icon, dDay_date, dDay_remainingDays)
     VALUES ($id, $title, $icon, $dDay_date, $dDay_remainingDays)`,
  );
}

export async function prepareSelectAllGoals() {
  const db = await dbPromise;
  return db.prepareAsync(`SELECT * FROM Goal`);
}

export async function prepareUpdateGoal() {
  const db = await dbPromise;
  return db.prepareAsync(
    `UPDATE Goal SET title = $title, icon = $icon, dDay_date = $dDay_date, dDay_remainingDays = $dDay_remainingDays WHERE id = $id`,
  );
}

export async function prepareDeleteGoal() {
  const db = await dbPromise;
  return db.prepareAsync(`DELETE FROM Goal WHERE id = $id`);
}
