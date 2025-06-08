import {dbPromise} from './goal';

export async function prepareGetGoalById() {
  const db = await dbPromise;
  return db.prepareAsync(`SELECT * FROM Goal WHERE id = $id`);
}

export async function prepareInsertGoal() {
  const db = await dbPromise;
  return db.prepareAsync(
    `INSERT INTO Goal (id, title, icon, created_date, dDay_date, isCompleted)
     VALUES ($id, $title, $icon, $created_date, $dDay_date, $isCompleted)`,
  );
}

export async function prepareSelectAllGoals() {
  const db = await dbPromise;
  return db.prepareAsync(`SELECT * FROM Goal`);
}

export async function prepareAllGoalIds() {
  const db = await dbPromise;
  return db.prepareAsync(`SELECT id FROM Goal`);
}

export async function prepareUpdateTitleGoal() {
  const db = await dbPromise;
  return db.prepareAsync(`UPDATE Goal SET title = $title WHERE id = $id`);
}

export async function prepareUpdateDateGoal() {
  const db = await dbPromise;
  return db.prepareAsync(
    `UPDATE Goal SET dDay_date = $dDay_date WHERE id = $id`,
  );
}

export async function prepareDeleteGoal() {
  const db = await dbPromise;
  return db.prepareAsync(`DELETE FROM Goal WHERE id = $id`);
}

export async function prepareCompleteGoal() {
  const db = await dbPromise;
  return db.prepareAsync(`UPDATE Goal SET isCompleted = 1 WHERE id = $id`);
}
