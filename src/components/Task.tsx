import { TodosProps } from "../interfaces";
import styles from "./Task.module.css";
import { Trash } from "phosphor-react";

export default function Task({
  id,
  title,
  isCompleted,
  onCheckTaskIsComplete,
  onDeleteTask,
}: TodosProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCheckTaskIsComplete() {
    onCheckTaskIsComplete(id);
  }

  return (
    <div className={styles["todo-container"]}>
      <div className={styles.todos}>
        <div className={styles.tasks}>
          <input
            title="checkbox"
            type="checkbox"
            id={id}
            onClick={handleCheckTaskIsComplete}
          />

          <label>
            <p>{title}</p>
          </label>
          <button type="button" title="delete" onClick={handleDeleteTask}>
            <Trash size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
