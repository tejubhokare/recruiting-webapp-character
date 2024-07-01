import React from 'react';
import './App.css';
import CharactersContainer from './components/CharacterContainers';
import { CharacterProvider } from './contexts/CharacterContext';

function App() {
  return (
    <CharacterProvider>
      <div className="App">
        <header className="App-header">
          <h1>React Coding Exercise</h1>
        </header>
        <section className="App-section">
          <CharactersContainer />
        </section>
      </div>
    </CharacterProvider>
  );
}

export default App;
