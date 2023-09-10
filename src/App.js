import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

import ReactDOM from "react-dom";
import React from "react";

const App = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoId, setTodoId] = useState(todos.length + 1);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value);
  };

  const resetFormInput = () => {
    setTodoTitle("");
  };
  const handleDetailFormChanges = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOpenDetailForm = ({ id, title, status, detail }) => {
    setIsDetailtable(true);
    setDetailId(id);
    setNewTitle(title);
  };

  const handleCloseDetailForm = () => {
    setIsDetailtable(false);
    setDetailId();
  };

  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };
  const handleDetailTodo = () => {
    const newTodos = todos.map((todo) => ({ ...todo }));

    setTodos(() =>
      newTodos.map((todo) =>
        todo.id === detailId ? { ...todo, title: newTitle } : todo
      )
    );
    setNewTitle("");
    handleCloseDetailForm();
    setDetailId();
  };

  const handleStatusChange = ({ id }, e) => {
    const newTodos = todos.map((todo) => ({ ...todo }));

    setTodos(
      newTodos.map((todo) =>
        todo.id === id ? { ...todo, status: e.target.value } : todo
      )
    );
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "notStarted":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "notStarted")
          );
          break;
        case "inProgress":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "inProgress")
          );
          break;
        case "done":
          setFilteredTodos(todos.filter((todo) => todo.status === "done"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  const [todos, setTodos] = useState([
    { id: 1, title: "Todo1", status: done, detail: detail },
  ]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), title: title, status: done, detail: detail },
      ];
    });
    todoNameRef.current.value = null;
  };

  return (
    <div>
      <h2>todo-app</h2>
      <TodoList todos={todos} />
      <input
        tyoe="text"
        lavel="タイトル"
        value={todoTitle}
        onChange={handleAddFormChanges}
        ref={todoNameRef}
      />
      <button onClick={handleAddTodo}>TODOの作成</button>
      <button onClick={handleAddTodo}>TODOの追加</button>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">すべて</option>
        <option value="notStarted">未着手</option>
        <option value="inProgress">作業中</option>
        <option value="done">完了</option>
      </select>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(todo, e)}
            >
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button onClick={() => handleOpenEditForm(todo)}>TODOの詳細</button>
            <button onClick={() => handleDeleteTodo(todo)}>TODOの削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
