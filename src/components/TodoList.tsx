import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { v4 as idv4 } from "uuid";

import styles from "./TodoList.module.css";
import { PlusCircle } from "phosphor-react";
import clipboard from "../assets/clipboard.svg";
import Task from "./Task";
import { TaskProps } from "../interfaces";

export default function TodoList() {
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [tasks, setTasks] = useState<TaskProps[]>(getTasksFromStorage());
  const [textTask, setTaskText] = useState<string>("");

  const hasTasks = tasks.length > 0;

  useEffect(() => {
    setTasksAtStorage();
  }, [tasks]);

  function getTasksFromStorage() {
    const storedStateAsJson = localStorage.getItem(
      "@ignite-to-do-list:tasks-state-1.0.0"
    );

    if (storedStateAsJson) {
      return JSON.parse(storedStateAsJson);
    }
    return [];
  }

  function setTasksAtStorage() {
    const stateJSON = JSON.stringify(tasks);

    localStorage.setItem("@ignite-to-do-list:tasks-state-1.0.0", stateJSON);
  }

  function createTask(event: FormEvent) {
    event.preventDefault();

    if (!textTask) {
      alert("O campo não pode ser vazio.");
      return;
    }

    const newTask = {
      id: idv4(),
      title: textTask,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);

    setTaskText("");
  }

  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskText(event.target.value);
  }

  function handleCompletedTasks() {
    let count = 0;
    tasks.filter((task) => {
      if (task.isCompleted === true) {
        count++;
      }
    });
    setCompletedTasks(count);
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== id;
    });
    tasks.map((task) => {
      if (task.id === id && task.isCompleted === true) {
        checkTaskIsComplete(id);
      }
    });

    setTasks(tasksWithoutDeletedOne);
  }

  function checkTaskIsComplete(id: string) {
    const newTasksState = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: (task.isCompleted = !task.isCompleted) };
      } else {
        return task;
      }
    });
    setTasks(newTasksState);
    handleCompletedTasks();
  }

  return (
    <main>
      <div className={styles.taskForm}>
        <form onSubmit={createTask}>
          <input
            name="task"
            type="text"
            placeholder="Adicione uma nova tarefa"
            className={styles.content}
            value={textTask}
            onChange={handleTextChange}
          />
          <button type="submit" className={styles.btn}>
            Criar
            <PlusCircle />
          </button>
        </form>
      </div>

      <div className={styles.overviewBox}>
        <section className={styles.overview}>
          <div className={styles.counter}>
            <p>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div className={styles.counterTwo}>
            <p>Concluídas</p>
            <span>
              {hasTasks
                ? `${completedTasks} de ${tasks.length}`
                : completedTasks}
            </span>
          </div>
        </section>
      </div>
      {hasTasks ? (
        tasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              onCheckTaskIsComplete={checkTaskIsComplete}
              onDeleteTask={handleDeleteTask}
              isCompleted={task.isCompleted}
            />
          );
        })
      ) : (
        <article className={styles.noTasks}>
          <div className={styles.tasksContainer}>
            <img src={clipboard} alt="clipboard" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        </article>
      )}
    </main>
  );
}
