import React from 'react';
import { useSelector } from 'react-redux';

const ContentFooter = () => {
  const items = useSelector(state => state.todos.items);
  //console.log(items);
  const itemsLeft = items.filter(item => !item.completed).length;
  //console.log(itemsLeft);
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft} </strong>
        {itemsLeft > 1 ? 'items left' : 'item left'}
      </span>

      <ul className="filters">
        <li>
          <button className="selected">All</button>
        </li>
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
      </ul>

      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default ContentFooter;
