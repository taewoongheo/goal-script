import {dbPromise} from './goal';

// --- TaskItem Table Prepared Statement Creators ---

// Params: $id, $goal_id, $text, $completed, $type
export async function prepareInsertTaskItem() {
  const db = await dbPromise;
  return db.prepareAsync(
    `INSERT INTO TaskItem (id, goal_id, text, completed, type)
     VALUES ($id, $goal_id, $text, $completed, $type)`,
  );
}

// Params: $goal_id
export async function prepareSelectTaskItemsByGoal() {
  const db = await dbPromise;
  return db.prepareAsync(`SELECT * FROM TaskItem WHERE goal_id = $goal_id`);
}

// Params: $id, $text, $completed, $type
export async function prepareUpdateTaskItem() {
  const db = await dbPromise;
  return db.prepareAsync(
    `UPDATE TaskItem SET text = $text, completed = $completed, type = $type WHERE id = $id`,
  );
}

// Params: $id
export async function prepareDeleteTaskItem() {
  const db = await dbPromise;
  return db.prepareAsync(`DELETE FROM TaskItem WHERE id = $id`);
}
