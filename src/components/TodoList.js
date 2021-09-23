import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, destroy } from '../redux/todos/todosSlice';

const TodoList = () => {
  const items = useSelector(state => state.todos.items);
  const dispatch = useDispatch();

  const handleRemove = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(destroy(id));
    }
  };
  return (
    <ul className="todo-list">
      {/* <li className="completed">
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>Learn JavaScript</label>
          <button className="destroy"></button>
        </div>
      </li>*/}

      {items.map(item => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button className="destroy" onClick={() => handleRemove(item.id)}></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
