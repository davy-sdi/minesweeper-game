import { useState, useEffect } from 'react';
import Game from './Game';
import './App.css';

function App() {

  return (
    <div className="app-container">
      <h1>React Minesweeper</h1>
      <Game />
    </div>
  );
}

export default App
