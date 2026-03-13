import { useEffect, useState } from "react";
import { getTodos } from "../services/todoService";

export default function TodoPage() {
  interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Todo List</h1>
      {todos.map((todo) => (
        <ul>
          <li key={todo.id}>{todo.title}</li>
        </ul>
      ))}
    </div>
  );
}
