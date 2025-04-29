import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [tasks, setTasks] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false },
  ]);
  let [newTasks, setNewTodo] = useState("");

  let addNewTaks = () => {
    setTasks((prevTodo) => {
      return [...prevTodo, { task: newTasks, id: uuidv4(), isDone: false }];
    });
  };

  let updateTaskvalue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTasks(() => tasks.filter((prevTodo) => prevTodo.id != id));
  };

  // let upperCaseAll = () => {
  //   tasks.map(() => {
  //     setTasks((prevTasks) =>
  //       prevTasks.map((todo) => {
  //         return {
  //           ...todo,
  //           task: todo.task.toUpperCase(),
  //         };
  //       })
  //     );
  //   });
  // };
  let markAllasDone = () => {
    tasks.map(() => {
      setTasks((prevTasks) =>
        prevTasks.map((todo) => {
          return {
            ...todo,
            isDone: true,
          };
        })
      );
    });
  };

  // let upperCaseOne = (id) => {
  //   tasks.map(() => {
  //     setTasks((prevTasks) =>
  //       prevTasks.map((todo) => {
  //         if (todo.id === id) {
  //           return {
  //             ...todo,
  //             task: todo.task.toUpperCase(),
  //           };
  //         } else {
  //           return todo;
  //         }
  //       })
  //     );
  //   });
  // };
  let markAsDone = (id) => {
    tasks.map(() => {
      setTasks((prevTasks) =>
        prevTasks.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: true,
            };
          } else {
            return todo;
          }
        })
      );
    });
  };
  return (
    <>
      <input
        type="text"
        placeholder="add a task"
        value={newTasks}
        onChange={updateTaskvalue}
      />
      <br />
      <br />
      <button onClick={addNewTaks}>Add Task</button>
      <br />
      <br />
      <hr />
      <h4>Todo List</h4>
      <ul>
        {tasks.map((todo) => {
          return (
            <li key={todo.id}>
              <span
                style={
                  todo.isDone ? { textDecorationLine: "line-through" } : {}
                }
              >
                {todo.task}
              </span>
              &nbsp; &nbsp;
              <button onClick={() => deleteTodo(todo.id)}>Mark All Done</button> &nbsp;
              &nbsp;
              <button onClick={() => markAsDone(todo.id)}>Mark Done</button>
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <button onClick={markAllasDone}>UpperCase All</button>
    </>
  );
}

/*
    import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false },
  ]);
  const [newTasks, setNewTodo] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addNewTaks = () => {
    const newTask = { task: newTasks, id: uuidv4(), isDone: false };
    console.log("Adding new task:", newTask);
    setTasks(prev => {
      debugger;
      const updated = [...prev, newTask];
      console.log("Updated tasks after adding:", updated);
      return updated;
    });
    setNewTodo(""); // Clear the input after adding a task
  };

  const updateTaskvalue = (event) => {
    debugger;
    console.log("Updating input value:", event.target.value);
    setNewTodo(event.target.value);
  };

  const deleteTodo = (id) => {
    console.log("Deleting task with id:", id);
    setTasks(prev => {
      debugger;
      const updated = prev.filter(todo => todo.id !== id);
      console.log("Updated tasks after deletion:", updated);
      return updated;
    });
  };

  const upperCaseAll = () => {
    console.log("Converting all tasks to uppercase");
    setTasks(prevTasks => {
      debugger;
      const updated = prevTasks.map(todo => ({
        ...todo,
        task: todo.task.toUpperCase(),
      }));
      console.log("Tasks after uppercasing all:", updated);
      return updated;
    });
  };

  const markAllasDone = () => {
    console.log("Marking all tasks as done");
    setTasks(prevTasks => {
      debugger;
      const updated = prevTasks.map(todo => ({
        ...todo,
        isDone: true,
      }));
      console.log("Tasks after marking all done:", updated);
      return updated;
    });
  };

  const upperCaseOne = (id) => {
    debugger;
    console.log("Converting task to uppercase with id:", id);
    setTasks(prevTasks => {
      debugger;
      const updated = prevTasks.map(todo =>
        todo.id === id ? { ...todo, task: todo.task.toUpperCase() } : todo
      );
      console.log("Tasks after uppercasing one:", updated);
      return updated;
    });
  };

  const markAsDone = (id) => {
    debugger;
    console.log("Marking task as done with id:", id);
    setTasks(prevTasks => {
      debugger;
      const updated = prevTasks.map(todo =>
        todo.id === id ? { ...todo, isDone: true } : todo
      );
      console.log("Tasks after marking one done:", updated);
      return updated;
    });
  };

  const editTask = (id) => {
    debugger;
    const taskToEdit = tasks.find(todo => todo.id === id);
    debugger;
    console.log(taskToEdit)
    setNewTodo(taskToEdit.task); // Set the task to be edited in the input field
    setEditingTaskId(id); // Set the task being edited
  };

  const saveTask = () => {
    if (editingTaskId !== null) {
      setTasks(prev => {
        const updated = prev.map(todo =>
          todo.id === editingTaskId
            ? { ...todo, task: newTasks }
            : todo
        );
        return updated;
      });
      setEditingTaskId(null); // Clear editing state after saving
      setNewTodo(""); // Clear input field
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="add a task"
        value={newTasks}
        onChange={updateTaskvalue}
      />
      <br />
      <br />
      <button onClick={editingTaskId === null ? addNewTaks : saveTask}>
        {editingTaskId === null ? "Add Task" : "Save Task"}
      </button>
      <br />
      <br />
      <hr />
      <h4>Todo List</h4>
      <ul>
        {tasks.map(todo => (
          <li key={todo.id}>
            <span
              style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
            >
              {todo.task}
            </span>
            &nbsp;&nbsp;
            <button onClick={() => markAsDone(todo.id)}>Mark Done</button>
            &nbsp;&nbsp;
            <button onClick={() => upperCaseOne(todo.id)}>UpperCase</button>
            &nbsp;&nbsp;
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            &nbsp;&nbsp;
            <button onClick={() => editTask(todo.id)}>Edit</button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <button onClick={markAllasDone}>Mark All Done</button>
      &nbsp;&nbsp;
      <button onClick={upperCaseAll}>UpperCase All</button>
    </>
  );
}

*/