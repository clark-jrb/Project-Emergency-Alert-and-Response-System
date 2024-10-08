import React from "react"
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Router from './Routes'
import { AuthProvider } from "./context/AuthContext"
import { UsersProvider } from "./context/UsersContext"
import { ActiveProvider } from "./context/ActiveContext"
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <UsersProvider>
        <AuthProvider>
          <ActiveProvider>
            <Router/>
          </ActiveProvider>
        </AuthProvider>
      </UsersProvider>
    </div>
  );
}

export default App;
