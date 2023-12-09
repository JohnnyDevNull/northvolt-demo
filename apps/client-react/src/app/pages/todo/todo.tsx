import { ITodo, ITodoPartial } from '@northvolt/shared';
import { ChangeEvent, useEffect, useState } from 'react';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../../util/http-request.function';
import TodoItem from './todo-item/todo-item';

const initialNewTodoState: string = '';
const initialTodosState: ITodoPartial[] = [];

export default function Todo() {
  const [newTodoText, setNewTodoText] = useState(initialNewTodoState);
  const [todos, setTodos] = useState(initialTodosState);

  useEffect(() => {
    getRequest<ITodo[]>({ path: 'todo' })
      .then(todos => setTodos(todos))
      .catch(console.error);
  }, []);

  const handleNewTodoChange = (event: ChangeEvent<HTMLInputElement>) => setNewTodoText(event.target.value);

  const handleAddTodo = () => {
    if (newTodoText.length === 0) {
      return;
    }

    const newTodo: ITodoPartial = {
      text: newTodoText,
      done: false,
    };

    postRequest<ITodo>({ path: 'todo', body: newTodo })
      .then(todo => setTodos(state => [...state, todo]))
      .then(() => setNewTodoText(''))
      .catch(console.error);
  };

  const handleDone = (id: string) =>
    patchRequest<ITodo>({ path: `todo/${id}`, body: { done: true } })
      .then(todo =>
        setTodos(state => {
          const todos = [...state];
          const index = todos.findIndex(i => i.id === id);
          if (index !== -1) {
            todos[index] = { ...todo };
          }
          return todos;
        }),
      )
      .catch(console.error);

  const handleDelete = (id: string) =>
    deleteRequest({ path: `todo/${id}` })
      .then(() => setTodos(state => [...state.filter(i => i.id !== id)]))
      .catch(console.error);

  return (
    <div>
      <h3>ToDo-List</h3>
      <div>
        <ul>
          {todos.map(todo => (
            <TodoItem key={todo.id} data={todo} onDoneHandler={handleDone} onDeleteHandler={handleDelete} />
          ))}
        </ul>
      </div>
      <div>
        <input type="text" value={newTodoText as string} onChange={handleNewTodoChange} />
        <button className="ml-sm" onClick={handleAddTodo}>
          Add
        </button>
      </div>
    </div>
  );
}
