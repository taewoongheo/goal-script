import {dbPromise} from './goal';

export async function prepareInsertTaskItem() {
  const db = await dbPromise;
  return db.prepareAsync(
    `INSERT INTO TaskItem (id, goal_id, text, completed)
     VALUES ($id, $goal_id, $text, $completed)`,
  );
}

export async function prepareSelectTaskItemsByGoal() {
  const db = await dbPromise;
  return db.prepareAsync(`SELECT * FROM TaskItem WHERE goal_id = $goal_id`);
}

export async function prepareUpdateTaskItem() {
  const db = await dbPromise;
  return db.prepareAsync(`UPDATE TaskItem SET text = $text WHERE id = $id`);
}

export async function prepareDeleteTaskItem() {
  const db = await dbPromise;
  return db.prepareAsync(`DELETE FROM TaskItem WHERE id = $id`);
}

export async function prepareUpdateTaskCompletion() {
  const db = await dbPromise;
  return db.prepareAsync(
    `UPDATE TaskItem SET completed = $completed WHERE id = $id`,
  );
}
