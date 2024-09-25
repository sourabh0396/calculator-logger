import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state for logs

  const handleClick = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else if (value === '=') {
      evaluateExpression();
    } else {
      setInput(input + value);
    }
  };

  const evaluateExpression = async () => {
    try {
      const res = eval(input); // Calculate the result
      setResult(res);
      await fetch('http://localhost:5000/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expression: input, // Ensure this matches the mock body in the test
          isValid: true,
          output: res,
        }),
      });
      fetchLogs(); // Fetch logs to update the list
    } catch (error) {
      setResult('Error');
    }
  };
  
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logs');
      const data = await response.json();
      console.log('Fetched logs:', data.logs); // Debugging
      setLogs(data.logs || []); // Ensure it's always an array
      setFilteredLogs(data.logs || []); // Ensure it's always an array
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setIsLoading(false); // Stop loading when fetch completes
    }
  };

  useEffect(() => {
    fetchLogs(); // Fetch logs on initial load
  }, []);

  return (
    <div id='main'>
      <div className="calculator">
        <div className="display">
          <input className='input' type="text" value={input} placeholder="0" readOnly />
          <div id="resultBox" className="result">{result}</div>
        </div>
        <div className="keypad">
          <div>
            <button className="operator btnnumber" onClick={() => handleClick('AC')}>AC</button>
            <button className="operator btnnumber" onClick={() => handleClick('%')}>%</button>
            <button className="operator btnnumber" onClick={() => handleClick('DEL')}>DEL</button>
            <button className="operator btnnumber" onClick={() => handleClick('/')}>/</button>
          </div>
          <div>
            <button className='btnnumber' onClick={() => handleClick('7')}>7</button>
            <button className='btnnumber' onClick={() => handleClick('8')}>8</button>
            <button className='btnnumber' onClick={() => handleClick('9')}>9</button>
            <button className="operator btnnumber" onClick={() => handleClick('*')}>*</button>
          </div>
          <div>
            <button className='btnnumber' onClick={() => handleClick('4')}>4</button>
            <button className='btnnumber' onClick={() => handleClick('5')}>5</button>
            <button className='btnnumber' onClick={() => handleClick('6')}>6</button>
            <button className="operator btnnumber" onClick={() => handleClick('-')}>-</button>
          </div>
          <div>
            <button className='btnnumber' onClick={() => handleClick('1')}>1</button>
            <button className='btnnumber' onClick={() => handleClick('2')}>2</button>
            <button className='btnnumber' onClick={() => handleClick('3')}>3</button>
            <button className="operator btnnumber" onClick={() => handleClick('+')}>+</button>
          </div>
          <div>
            <button className='btnnumber' onClick={() => handleClick('00')}>00</button>
            <button className='btnnumber' onClick={() => handleClick('0')}>0</button>
            <button className="operator btnnumber" onClick={() => handleClick('.')}>.</button>
            <button className="operator btnnumber eql" onClick={() => handleClick('=')}>=</button>
          </div>
        </div>
      </div>
      <div id='table'>
        {isLoading ? (
          <p>Loading logs...</p> // Loading message while logs are being fetched
        ) : (
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Expression</th>
                <th>Valid</th>
                <th>Output</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredLogs) && filteredLogs.length > 0 ? (
                filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.expression}</td>
                    <td>{log.isValid ? 'Valid' : 'Invalid'}</td>
                    <td>{log.output}</td>
                    <td>{new Date(log.createdOn).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No logs available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Calculator;
