import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [term, setTerm] = useState("");
  const [advice, setAdvice] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
  };

  const handleSearch = () => {
    fetch(`https://api.adviceslip.com/advice/search/${term}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.slips);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetAdvice();
  }, []);

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
        <button onClick={handleSearch}>Enviar</button>
        <h3>Resultados de búsqueda:</h3>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result.advice}</li>
          ))}
        </ul>
      </div>

    </main>
  );
}

export default App;