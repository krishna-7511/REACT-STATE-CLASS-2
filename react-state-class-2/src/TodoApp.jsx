import React, { useState } from "react";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Add Todo
  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, isDone: false, isEditing: false }]);
    setInput("");
  };

  // Delete Todo
  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  // Toggle Done
  const toggleDone = (index) => {
    const updated = [...todos];
    updated[index].isDone = !updated[index].isDone;
    setTodos(updated);
  };

  // Start Editing
  const editTodo = (index) => {
    const updated = [...todos];
    updated[index].isEditing = true;
    setTodos(updated);
  };

  // Save Edited Todo
  const saveTodo = (index, newText) => {
    const updated = [...todos];
    updated[index].text = newText;
    updated[index].isEditing = false;
    setTodos(updated);
  };

  // Mark All as Done
  const markAllDone = () => {
    const updated = todos.map(todo => ({ ...todo, isDone: true }));
    setTodos(updated);
  };

  // Convert All to Uppercase
  const convertAllToUppercase = () => {
    const updated = todos.map(todo => ({
      ...todo,
      text: todo.text.toUpperCase(),
    }));
    setTodos(updated);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={markAllDone}>Mark All Done</button>
      <button onClick={convertAllToUppercase}>All Uppercase</button>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleDone={toggleDone}
            editTodo={editTodo}
            saveTodo={saveTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
