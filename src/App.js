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
      <DummyCalculatorTable/>
    </div>
    </>
  );
}

export default App;
