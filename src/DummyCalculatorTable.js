import React from 'react';
const dummyLogs = [
    { id: 1, expression: "5 + 3", isValid: true, output: 8, createdOn: "2024-09-01" },
    { id: 2, expression: "10 / 2", isValid: true, output: 5, createdOn: "2024-09-02" },
    { id: 3, expression: "7 * 9", isValid: true, output: 63, createdOn: "2024-09-03" },
    { id: 4, expression: "4 - 6", isValid: true, output: -2, createdOn: "2024-09-04" },
    { id: 5, expression: "100 % 3", isValid: true, output: 1, createdOn: "2024-09-05" },
    { id: 6, expression: "8 + 6", isValid: true, output: 14, createdOn: "2024-09-06" },
    { id: 7, expression: "9 / 0", isValid: false, output: "Error", createdOn: "2024-09-07" },
    { id: 8, expression: "50 * 2", isValid: true, output: 100, createdOn: "2024-09-08" },
    { id: 9, expression: "12 - 7", isValid: true, output: 5, createdOn: "2024-09-09" },
    { id: 10, expression: "18 / 3", isValid: true, output: 6, createdOn: "2024-09-10" },
    { id: 11, expression: "5 + 7 * 2", isValid: true, output: 19, createdOn: "2024-09-11" },
    { id: 12, expression: "30 % 4", isValid: true, output: 2, createdOn: "2024-09-12" },
    { id: 13, expression: "0 * 100", isValid: true, output: 0, createdOn: "2024-09-13" },
    { id: 14, expression: "90 / 10", isValid: true, output: 9, createdOn: "2024-09-14" },
    { id: 15, expression: "60 + 30", isValid: true, output: 90, createdOn: "2024-09-15" },
    { id: 16, expression: "2 * 2 * 2", isValid: true, output: 8, createdOn: "2024-09-16" },
    { id: 17, expression: "20 - 4", isValid: true, output: 16, createdOn: "2024-09-17" },
    { id: 18, expression: "81 % 9", isValid: true, output: 0, createdOn: "2024-09-18" },
    { id: 19, expression: "sqrt(16)", isValid: false, output: "Error", createdOn: "2024-09-19" },
    { id: 20, expression: "7 + 5", isValid: true, output: 12, createdOn: "2024-09-20" }
  ];
const DummyCalculatorTable = () => {
  return (
    <div>
        <div>
            <h1 style={{textAlign:'center',backgroundColor:'#1c83777e',color:'white'}}>Dummy Data Calculator Table</h1>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Expression</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Valid</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Output</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created On</th>
        </tr>
      </thead>
    <tbody>
        {dummyLogs.map(log => (
            <tr key={log.id} data-testid="table-row">
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.id}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.expression}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.isValid ? 'True' : 'False'}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.output}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(log.createdOn).toLocaleDateString()}</td>
            </tr>
        ))}
    </tbody>
    </table>
    </div>
  );
};

export default DummyCalculatorTable;