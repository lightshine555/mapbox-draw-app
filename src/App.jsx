import React from 'react';
import MapComponent from './components/MapComponent';
import ShapeInfo from './components/ShapeInfo';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Mapbox Drawing App</h1>
      <div className="main-content">
         <MapComponent />
         <ShapeInfo />
      </div>
    </div>
  );
}

export default App;