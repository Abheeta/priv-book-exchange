import logo from './logo.svg';
import { Switch } from "react-router";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.css';
import Register from './components/Register';

function App() {
  console.log(JSON.parse(localStorage.getItem("auth")));
  if(localStorage.getItem("auth") == null){
    localStorage.setItem("auth",JSON.stringify({
      auth: false, 
      type: "none", 
      user: null
  
    }))
  }
  // window.onbeforeunload = () => {
  //   localStorage.removeItem("auth");
  //   return "Hi";
  // }
  return (
    <div className="App">
      NavBar
      <Router>
        <Switch>
          <Route path = "/register" component = {Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
