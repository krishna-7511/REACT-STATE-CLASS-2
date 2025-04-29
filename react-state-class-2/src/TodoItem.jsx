import React, { useState } from "react";

const TodoItem = ({ todo, index, deleteTodo, toggleDone, editTodo, saveTodo }) => {
  const [editText, setEditText] = useState(todo.text);

  return (
    <li style={{ marginBottom: "10px" }}>
      {todo.isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => saveTodo(index, editText)}>Save</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.isDone ? "line-through" : "none",
              marginRight: "10px",
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => toggleDone(index)}>
            {todo.isDone ? "Undo" : "Done"}
          </button>
          <button onClick={() => editTodo(index)}>Edit</button>
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
