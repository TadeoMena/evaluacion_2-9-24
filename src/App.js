import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [term, setTerm] = useState("")
  const [advice, setAdvice] = useState("")

  const handleTermChange = (event) => setTerm(event.target.value);

  const handleGetAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        setAdvice(data.slip.advice);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <main>

      <h1>Evaluación React - Requests</h1>
      <h1>Consejos de vida</h1>

      <div>
        <h2>Obtener un consejo aleatorio</h2>
        <button onClick={handleGetAdvice}>Obtener</button>
        
        <p className="result-box">{advice}</p>
      </div>

      <div>
        <h2>Buscar un consejo</h2>
        <input type="text" onChange={handleTermChange} />
        <button>Enviar</button>
        <h3>Resultados de búsqueda:</h3>
        <p className="result-box"></p>
      </div>

    </main>
  );
}

export default App;