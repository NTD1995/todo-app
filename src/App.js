import logo from './logo.svg';
import './App.css';
import { useState, useRef} from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([{id: 1, name: "Todo1", completed: false }
]);

const todoNameRef = useRef();

const handleAddTodo = () => {
 const name = todoNamerRef.current.value;
 if(name === "") return
 setTodos((prevTodos) => {
   return [...prevTodos, { id: uuidv4(), nmae: name, completed: false }];
 });
 todoNameRef.current.value = null;
};

  return (
    <div>
    <h2>
         todo-app 
    </h2> 
         <TodoList todos={todos} />
         <input tyoe="text" ref={todoNameRef} />
         <button onClick={handleAddTodo}>TODOの追加</button>
         <button>TODOの削除</button>
    </div>
  );
}

export default App;
