import React, { useState } from 'react';
import './App.css';
import './Styles.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);
  const [isRedEnabled, setIsRedEnabled] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      if (selectedTodoIndex !== null) {
        // If selectedTodoIndex is not null, it means we are updating an existing todo
        const updatedTodos = [...todos];
        updatedTodos[selectedTodoIndex] = inputText;
        setTodos(updatedTodos);
        setSelectedTodoIndex(null);
      } else {
        setTodos([...todos, inputText]);
      }
      setInputText('');
    }
  };

  const handleUpdateTodo = (index) => {
    setInputText(todos[index]);
    setSelectedTodoIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    // Remove the corresponding value from isRedEnabled array when a todo is deleted
    const updatedIsRedEnabled = [...isRedEnabled];
    updatedIsRedEnabled.splice(index, 1);
    setIsRedEnabled(updatedIsRedEnabled);
  };

  const handleToggleRed = (index) => {
    const updatedIsRedEnabled = [...isRedEnabled];
    updatedIsRedEnabled[index] = !updatedIsRedEnabled[index];
    setIsRedEnabled(updatedIsRedEnabled);
  };

  return (
    <div className="App">
      <h1>To-do List</h1>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span style={{ color: isRedEnabled[index] ? 'red' : 'inherit' }}>{todo}</span>
            <button onClick={() => handleUpdateTodo(index)}>Update</button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            <button onClick={() => handleToggleRed(index)}>Toggle Red</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
