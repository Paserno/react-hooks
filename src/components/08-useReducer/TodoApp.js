import React, { useReducer } from 'react';
import { todoReducer } from './todoReducer';

import './styles.css'; 

const initialState = [{
  id: new Date().getTime(),
  desc: 'Aprender React',
  done: false
}];

export const TodoApp = () => {

  const [ todos ] = useReducer(todoReducer, initialState);

  console.log(todos);

  return (
  <div>
      <h1>Todo App</h1>
      <hr/>

    <ul>
      <li>Hola</li>
      <li>Mundo</li>
      <li>Hola de nuevo</li>
    </ul>

  </div>
  )
};
