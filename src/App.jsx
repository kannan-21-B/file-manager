import React from 'react';
import FileManager from './components/FileManager';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="title">📁 File Manager</h1>
      <FileManager />
    </div>
  );
}

export default App;