import React from 'react';
import './App.css';

import FormIndex from './components/form-parts/Form';

function App() {
  return (
    <div className="App">
      <div className="main-banner">
        <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/100/000000/external-court-law-and-crime-kiranshastry-solid-kiranshastry.png"/>
        <h1>الهيئة العامة للاستثمار</h1>
      </div>
      <FormIndex />
    </div>
  );
}

export default App;
