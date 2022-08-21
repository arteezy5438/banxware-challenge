import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import BalanceAndChartPage from './components/BalanceAndChartPage';
import BalanceChart from './components/BalanceChart';
import CurrentBalance from './components/CurrentBalance';
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
