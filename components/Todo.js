import React from "react";
import {observer} from "mobx-react";

const Todo = observer(({todo, deleteTodo}) => {
  console.log(todo, deleteTodo);
  return (
    <li onClick={() => deleteTodo(todo.id)}>
      <input type='checkbox' checked={todo.finished} />
      {todo.title}
    </li>
  );
});

export default Todo;
