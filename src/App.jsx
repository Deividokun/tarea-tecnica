import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputArray, setInputArray] = useState('');
  const [reversedArray, setReversedArray] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/reverse-array', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ array: inputArray.split(',').map(Number) }), // Convert input string to array of numbers
      });
      
      const data = await response.json();
      if (data.reversedArray) {
        setReversedArray(data.reversedArray);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Invertir Array</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe números separados por comas"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>
          Enviar
        </button>
      </form>

      {reversedArray.length > 0 && (
        <table style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '10px' }}>Número</th>
            </tr>
          </thead>
          <tbody>
            {reversedArray.map((num, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: '1px solid black',
                    padding: '10px',
                    backgroundColor:
                      num === 0 ? 'yellow' : num % 2 === 0 ? 'green' : 'red',
                    color: 'white',
                  }}
                >
                  {num}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
