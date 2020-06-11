import React from 'react';
import './App.css';
import Layout from "../src/components/Layout/Layout";
import BurgerBuilder from './containers/BulgerBuilder/BurgerBuilder';

function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
