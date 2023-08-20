// src/App.tsx

import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/routers'; // Import the AppRoutes component
import "../src/tailwind.css"


function App() {
  return (
    <div className="App">
      <AppRoutes/>
    </div>
  );
}
export default App;
