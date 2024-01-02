import React from "react"
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Router from './Routes'
import { AuthProvider } from "./context/AuthContext"
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </div>
  );
}

export default App;
