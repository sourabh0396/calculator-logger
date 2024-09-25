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

  // const evaluateExpression = async () => {
  //   try {
  //     const res = eval(input); // Consider using a safer alternative than eval
  //     setResult(res);
  //     await fetch('http://localhost:5000/api/logs', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         expression: input,
  //         isValid: true,
  //         output: res,
  //       }),
  //     });
  //     fetchLogs(); // Fetch logs to update the list
  //   } catch (error) {
  //     setResult('Error');
  //   }
  // };
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
// import React, { useState, useEffect } from 'react';
// import './Calculator.css';

// const Calculator = () => {
//   const [input, setInput] = useState('');
//   const [result, setResult] = useState('');
//   const [logs, setLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);

//   const handleClick = (value) => {
//     if (value === 'AC') {
//       setInput('');
//       setResult('');
//     } else if (value === 'DEL') {
//       setInput(input.slice(0, -1));
//     } else if (value === '=') {
//       evaluateExpression();
//     } else {
//       setInput(input + value);
//     }
//   };

//   const evaluateExpression = async () => {
//     try {
//       const res = eval(input); // Consider using a safer alternative than eval
//       setResult(res);
//       await fetch('http://localhost:5000/api/logs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           expression: input,
//           isValid: true,
//           output: res,
//         }),
//       });
//       fetchLogs(); // Fetch logs to update the list
//     } catch (error) {
//       setResult('Error');
//     }
//   };

//   const fetchLogs = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/logs');
//       const data = await response.json();
//       setLogs(data.logs);
//       setFilteredLogs(data.logs); // Set filtered logs after fetching
//     } catch (error) {
//       console.error('Error fetching logs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchLogs(); // Fetch logs on initial load
//   }, []);

//   return (
//     <div id='main'>
//       <div className="calculator">
//         <div className="display">
//           <input className='input' type="text" value={input} placeholder="0" readOnly />
//           <div id="resultBox" className="result">{result}</div>
//         </div>
//         <div className="keypad">
//           <div>
//             <button className="operator btnnumber" onClick={() => handleClick('AC')}>AC</button>
//             <button className="operator btnnumber" onClick={() => handleClick('%')}>%</button>
//             <button className="operator btnnumber" onClick={() => handleClick('DEL')}>DEL</button>
//             <button className="operator btnnumber" onClick={() => handleClick('/')}>/</button>
//           </div>
//           <div>
//             <button className='btnnumber' onClick={() => handleClick('7')}>7</button>
//             <button className='btnnumber' onClick={() => handleClick('8')}>8</button>
//             <button className='btnnumber' onClick={() => handleClick('9')}>9</button>
//             <button className="operator btnnumber" onClick={() => handleClick('*')}>*</button>
//           </div>
//           <div>
//             <button className='btnnumber' onClick={() => handleClick('4')}>4</button>
//             <button className='btnnumber' onClick={() => handleClick('5')}>5</button>
//             <button className='btnnumber' onClick={() => handleClick('6')}>6</button>
//             <button className="operator btnnumber" onClick={() => handleClick('-')}>-</button>
//           </div>
//           <div>
//             <button className='btnnumber' onClick={() => handleClick('1')}>1</button>
//             <button className='btnnumber' onClick={() => handleClick('2')}>2</button>
//             <button className='btnnumber' onClick={() => handleClick('3')}>3</button>
//             <button className="operator btnnumber" onClick={() => handleClick('+')}>+</button>
//           </div>
//           <div>
//             <button className='btnnumber' onClick={() => handleClick('00')}>00</button>
//             <button className='btnnumber' onClick={() => handleClick('0')}>0</button>
//             <button className="operator btnnumber" onClick={() => handleClick('.')}>.</button>
//             <button className="operator btnnumber eql" onClick={() => handleClick('=')}>=</button>
//           </div>
//         </div>
//       </div>
//       <div id='table'>
//         <div>
//           <table style={{ width: '100%' }}>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Expression</th>
//                 <th>Valid</th>
//                 <th>Output</th>
//                 <th>Created On</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredLogs.map(log => (
//                 <tr key={log.id}>
//                   <td>{log.id}</td>
//                   <td>{log.expression}</td>
//                   <td>{log.isValid ? 'Valid' : 'Invalid'}</td>
//                   <td>{log.output}</td>
//                   <td>{new Date(log.createdOn).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calculator;

// // import React, { useState, useEffect } from 'react';
// // import './Calculator.css';

// // const Calculator = () => {
// //   const [input, setInput] = useState('');
// //   const [result, setResult] = useState('');
// //   const [logs, setLogs] = useState([]);
// //   const [filteredLogs, setFilteredLogs] = useState([]);
// //   const [selectedIds, setSelectedIds] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [filters, setFilters] = useState({
// //     id: '',
// //     expression: '',
// //     isValid: '',
// //     output: '',
// //     createdOn: null,
// //   });

// //   const handleClick = (value) => {
// //     if (value === 'AC') {
// //       setInput('');
// //       setResult('');
// //     } else if (value === 'DEL') {
// //       setInput(input.slice(0, -1));
// //     } else if (value === '=') {
// //       evaluateExpression();
// //     } else {
// //       setInput(input + value);
// //     }
// //   };

// //   const evaluateExpression = async () => {
// //     try {
// //       const res = eval(input); // Be cautious with eval, consider safer alternatives
// //       setResult(res);
// //       await fetch('http://localhost:5000/api/logs', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           expression: input,
// //           isValid: true,
// //           output: res,
// //         }),
// //       });
// //       fetchLogs(); // Fetch logs to update the list
// //     } catch (error) {
// //       setResult('Error');
// //     }
// //   };

// //   const fetchLogs = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/logs');
// //       const data = await response.json();
// //       setLogs(data.logs);
// //       applyFilters(data.logs); // Apply filters after fetching logs
// //     } catch (error) {
// //       console.error('Error fetching logs:', error);
// //     }
// //   };

// //   const applyFilters = (logsToFilter) => {
// //     let filtered = logsToFilter;

// //     if (filters.id) {
// //       filtered = filtered.filter(log => log.id.toString().includes(filters.id));
// //     }
// //     if (filters.expression) {
// //       filtered = filtered.filter(log => log.expression.includes(filters.expression));
// //     }
// //     if (filters.isValid) {
// //       filtered = filtered.filter(log => log.isValid.toString() === filters.isValid);
// //     }
// //     if (filters.output) {
// //       filtered = filtered.filter(log => log.output.toString().includes(filters.output));
// //     }
// //     if (filters.createdOn) {
// //       const selectedDate = filters.createdOn.toLocaleDateString();
// //       filtered = filtered.filter(log => new Date(log.createdOn).toLocaleDateString() === selectedDate);
// //     }

// //     setFilteredLogs(filtered);
// //   };

// //   // const handleFilterChange = (e, key) => {
// //   //   const value = e.target.value;
// //   //   setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
// //   // };
// //   // const handleDateChange = (date) => {
// //   //   setFilters(prevFilters => ({ ...prevFilters, createdOn: date }));
// //   // };
// //   // const handleCheckboxChange = (id) => {
// //   //   if (selectedIds.includes(id)) {
// //   //     setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
// //   //   } else {
// //   //     setSelectedIds([...selectedIds, id]);
// //   //   }
// //   // };
// //   // const handleSelectAllChange = () => {
// //   //   setSelectAll(!selectAll);
// //   //   if (!selectAll) {
// //   //     setSelectedIds(filteredLogs.map(log => log.id));
// //   //   } else {
// //   //     setSelectedIds([]);
// //   //   }
// //   // };
// //   // const deleteSelectedLogs = async () => {
// //   //   try {
// //   //     await fetch('http://localhost:5000/api/logs', {
// //   //       method: 'DELETE',
// //   //       headers: {
// //   //         'Content-Type': 'application/json',
// //   //       },
// //   //       body: JSON.stringify({ ids: selectedIds }),
// //   //     });
// //   //     fetchLogs(); // Fetch logs to update the list
// //   //   } catch (error) {
// //   //     console.error('Error deleting logs:', error);
// //   //   }
// //   // };

// //   useEffect(() => {
// //     fetchLogs(); // Fetch logs on initial load
// //   }, []);

// //   useEffect(() => {
// //     applyFilters(logs); // Apply filters whenever the filter state changes
// //   }, [filters, logs]);

// //   useEffect(() => {
// //     setSelectAll(filteredLogs.length > 0 && selectedIds.length === filteredLogs.length);
// //   }, [selectedIds, filteredLogs]);

// //   return (
// //     <div id='main'>
// //       <div className="calculator">
// //         <div className="display">
// //           <input className='input' type="text" value={input} placeholder="0" readOnly />
// //           <div id="resultBox" className="result">{result}</div>
// //         </div>
// //         <div className="keypad">
// //           <div>
// //             <button className="operator btnnumber" onClick={() => handleClick('AC')}>AC</button>
// //             <button className="operator btnnumber" onClick={() => handleClick('%')}>%</button>
// //             <button className="operator btnnumber" onClick={() => handleClick('DEL')}>DEL</button>
// //             <button className="operator btnnumber" onClick={() => handleClick('/')}>/</button>
// //           </div>
// //           <div>
// //             <button className='btnnumber' onClick={() => handleClick('7')}>7</button>
// //             <button className='btnnumber' onClick={() => handleClick('8')}>8</button>
// //             <button className='btnnumber' onClick={() => handleClick('9')}>9</button>
// //             <button className="operator btnnumber" onClick={() => handleClick('*')}>*</button>
// //           </div>
// //           <div>
// //             <button className='btnnumber' onClick={() => handleClick('4')}>4</button>
// //             <button className='btnnumber' onClick={() => handleClick('5')}>5</button>
// //             <button className='btnnumber' onClick={() => handleClick('6')}>6</button>
// //             <button className="operator btnnumber" onClick={() => handleClick('-')}>-</button>
// //           </div>
// //           <div>
// //             <button className='btnnumber' onClick={() => handleClick('1')}>1</button>
// //             <button className='btnnumber' onClick={() => handleClick('2')}>2</button>
// //             <button className='btnnumber' onClick={() => handleClick('3')}>3</button>
// //             <button className="operator btnnumber" onClick={() => handleClick('+')}>+</button>
// //           </div>
// //           <div>
// //             <button className='btnnumber' onClick={() => handleClick('00')}>00</button>
// //             <button className='btnnumber' onClick={() => handleClick('0')}>0</button>
// //             <button className="operator btnnumber" onClick={() => handleClick('.')}>.</button>
// //             <button className="operator btnnumber eql" onClick={() => handleClick('=')}>=</button>
// //           </div>
// //         </div>
// //       </div>
// //       <div id='table'>
// //         <div>
// //           <table style={{ width: '100%' }}>
// //             <thead>
// //               <tr>
// //                 <th>ID</th>
// //                 <th>Expression</th>
// //                 <th>Valid</th>
// //                 <th>Output</th>
// //                 <th>Created On</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredLogs.map(log => (
// //                 <tr key={log.id}>
// //                   <td>{log.id}</td>
// //                   <td>{log.expression}</td>
// //                   <td>{log.isValid ? 'Valid' : 'InValid'}</td>
// //                   <td>{log.output}</td>
// //                   <td>{new Date(log.createdOn).toLocaleDateString()}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Calculator;
