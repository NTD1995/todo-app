import "./App.css";
import { useEffect,useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const App = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, title: "Todo1", status: filter, detail: detail },
  ]);
  // const [todoId, setTodoId] = useState(todos.length + 1);
  
  const [isEditable, setIsEditable] = useState(false);

  const [editId, setEditId] = useState('')

  const [newTitle, setNewTitle] = useState('')

    const [filteredTodos, setFilteredTodos] = useState([])

  // 入力されたtodoの値を設定する処理
  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value);
  };

  // const resetFormInput = () => {
  //   setTodoTitle("");
  // };
  // todoの詳細を設定する処理
  const handleDetailFormChanges = (e) => {
    setDetail(e.target.value);
  };

  // const handleOpenDetailForm = ({ id, title, status, detail }) => {
  //   setIsDetailtable(true);
  //   setDetailId(id);
  //   setNewTitle(title);
  // };

  // const handleCloseDetailForm = () => {
  //   setIsDetailtable(false);
  //   setDetailId();
  // };

  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };
  
  // const handleDetailTodo = () => {
  //   const newTodos = todos.map((todo) => ({ ...todo }));

  //   setTodos(() =>
  //     newTodos.map((todo) =>
  //       todo.id === detailId ? { ...todo, title: newTitle } : todo
  //     )
  //   );
  //   setNewTitle("");
  //   handleCloseDetailForm();
  //   setDetailId();
  // };


    setTodos(
      newTodos.map((todo) =>
        todo.id === id ? { ...todo, status: e.target.value } : todo
      )
    );
  };

  // 　todoの追加
  const handleAddTodo = () => {
      setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted' }])
    //　todosを今のtodoの一覧に新しいtodoを追加した配列に更新する
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), title: todoTitle, status: filter, detail: detail },
      ];
    });
  };

    const handleOpenEditForm = (todo) => {
    setIsEditable(true)
    setEditId(todo.id)
    setNewTitle(todo.title)
  }

  const handleEditFormChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleCloseEditForm = () => {
    setIsEditable(false)
        setEditId('')
  }

  const handleEditTodo = () => {
    const newArray = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: newTitle } : todo
    )
    setTodos(newArray)
    setEditId('')
    setNewTitle('')
    handleCloseEditForm('')
  }


     const newArray = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    )
    setTodos(newArray)

    useEffect(() => {
    console.log('useEffect発動')
  }, [filter, todos])

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

  console.log(todos);

  return (
    <div>
      <h2>todo-app</h2>
      {/*todoの一覧を表示する  */}
      {/* <TodoList todos={todos} /> */}
      {isEditable ? (
        <div>
          <input type="text" label="新しいタイトル" />
              value={newTitle}
              onChange={handleEditFormChange}
          <button onClick={handleEditTodo}>編集を保存</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </div>
      ) : (
        <div>
      <input type="text" value={todoTitle} onChange={handleAddFormChanges} />
      <input type="text" value={detail} onChange={handleDetailFormChanges} />
      <button onClick={handleAddTodo}>TODOの作成</button>
      <button onClick={handleAddTodo}>TODOの追加</button>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">すべて</option>
        <option value="notStarted">未着手</option>
        <option value="inProgress">作業中</option>
        <option value="done">完了</option>
      </select>
      </div>
      )}
      {/* todoの一覧を表示する */}
      <ul>
          {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <span>{todo.detail}</span>
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(todo, e)}
            >
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button onClick={() => handleOpenEditForm(todo)}>TODOの編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>TODOの削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
