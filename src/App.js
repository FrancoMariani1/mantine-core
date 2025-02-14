import React from 'react';
import UserComponent from './components/UserComponents'; // Importamos el componente

function App() {
  return (
    <div className="App">
      <h1>Proyecto Franco</h1>
      <UserComponent /> {/* ✅ Agregamos el componente aquí */}
    </div>
  );
}

export default App;