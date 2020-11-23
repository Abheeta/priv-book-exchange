import logo from './logo.svg';
import { Switch } from "react-router";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.css';
import { AuthContext } from "./context/auth.js"
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      NavBar
      <Router>
        <AuthContext.Provider value = {{auth: false, type: "none", user: null}}>
        <Switch>
          <Route path = "/register" component = {Register} />
        </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
