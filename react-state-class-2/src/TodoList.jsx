import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [tasks, setTasks] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false },
  ]);
  let [newTasks, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTasks.trim() === "") return;
    setTasks((prevTodo) => [
      ...prevTodo,
      { task: newTasks, id: uuidv4(), isDone: false },
    ]);
    setNewTodo(""); // clear input
  };

  let updateTaskvalue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  let upperCaseAll = () => {
    setTasks((prevTasks) =>
      prevTasks.map((todo) => ({
        ...todo,
        task: todo.task.toUpperCase(),
      }))
    );
  };

  let markAllasDone = () => {
    setTasks((prevTasks) =>
      prevTasks.map((todo) => ({
        ...todo,
        isDone: true,
      }))
    );
  };

  let upperCaseOne = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((todo) =>
        todo.id === id
          ? { ...todo, task: todo.task.toUpperCase() }
          : todo
      )
    );
  };

  let markAsDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((todo) =>
        todo.id === id
          ? { ...todo, isDone: true }
          : todo
      )
    );
  };

  return (
    <>
      <input
        type="text"
        placeholder="Add a task"
        value={newTasks}
        onChange={updateTaskvalue}
      />
      <br />
      <br />
      <button onClick={addNewTask}>Add Task</button>
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
              &nbsp;
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              &nbsp;
              <button onClick={() => markAsDone(todo.id)}>Mark Done</button>
              &nbsp;
              <button onClick={() => upperCaseOne(todo.id)}>Uppercase</button>
            </li>
          );
        })}
      </ul>
      <br />
      <button onClick={markAllasDone}>Mark All as Done</button>
      &nbsp;
      <button onClick={upperCaseAll}>Uppercase All</button>
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


one mor case for uppercaseall
const upperCaseAll = () => {
    console.log("Converting all tasks to uppercase");
  
    // Using setTasks to update the tasks state
    setTasks(prevTasks => {
      debugger;
      // Step 1: Iterate through each task in the previous state (prevTasks)
      const updatedTasks = prevTasks.map(todo => {
        debugger;
        // Step 2: For each task (todo), convert the task text to uppercase
        const updatedTodo = { 
          ...todo, // Keep other properties unchanged
          task: todo.task.toUpperCase() // Convert the task text to uppercase
        };
  
        // Step 3: Log the individual task before it is updated (optional)
        console.log("Before Uppercasing:", todo);
        console.log("After Uppercasing:", updatedTodo);
  
        // Return the updated task
        return updatedTodo;
      });
  
      // Step 4: Log all updated tasks after converting them to uppercase
      console.log("All tasks after uppercasing:", updatedTasks);
  
      // Return the updated tasks array to update the state
      return updatedTasks;
    });
  };
*/