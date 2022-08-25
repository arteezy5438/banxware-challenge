import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import BalanceAndChartPage from './components/BalanceAndChartPage';
function App() {


  useEffect(() => {
  },[]);

  return (
    <div id="My-Balance-App" className="App">
      <h1>My Balance App</h1>
      <BalanceAndChartPage />

    </div>
  ); 
}

export default App;
