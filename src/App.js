import logo from './logo.svg';
import { Switch } from "react-router";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Cookie from "universal-cookie";
import './App.css';
import Register from './components/Register';
import Test from './components/Test';
import Login from './components/Login';
const cookies = new Cookie();

function App() {
  console.log("auth=", cookies.get("auth"));
  if(cookies.get("auth") == undefined) {
    cookies.set("auth", {
      auth: false, 
      type: "none", 
      user: null
    }, { path: "/" });
  }

  return (
    <div className="App">
      NavBar
      <Router>
        <Switch>
          <Route path="/test" component={Test} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
