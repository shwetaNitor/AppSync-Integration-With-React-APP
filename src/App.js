import React from 'react';
import './App.css';
import CreateTodo from './createTodo';
import DisplayTodos from './displayTodos';

function App() {
  return (
    <div className="App">
        <CreateTodo />
        <DisplayTodos />
    </div>
  );
}

export default App;
