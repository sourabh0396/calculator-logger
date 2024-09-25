import logo from './logo.svg';
import './App.css';
import Calculator from './Calculator.jsx';
import DummyCalculatorTable from './DummyCalculatorTable.js'; 
import MockCalculatorTable from './DummyCalculatorTable.js';

function App() {
  return (
    <>
    <div className="App">
      <h1 style={{textAlign:"center",backgroundColor:'#1c83777e',color:'white',padding:'10px'}}>React Testing</h1>
      <Calculator/>
    </div>
    <div>
      {/* <DummyCalculatorTable/> */}
    </div>
    </>
  );
}

export default App;
// import logo from './logo.svg';

// import './App.css';
// import Calculator from './Calculator';

// function App() {
//   return (
//     <div className="App">
//       <Calculator/>
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }

// export default App;
