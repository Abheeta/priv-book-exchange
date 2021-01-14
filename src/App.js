import logo from './logo.svg';
import { Switch } from "react-router";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Cookie from "universal-cookie";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Books from './components/Books';
import Sell from './components/Sell';
import Buy from './components/Buy';
import Wishlist from './components/Wishlist';
import Sales from './components/Sales';
import Home from './components/Home';
import Requests from './components/Requests';
import Purchase from './components/Purchase';
import DeliverSale from './components/DeliverSale';
import MyDeliveries from './components/MyDeliveries';
import Profile from './components/Profile';
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
      <Router>
        <Navbar />
        <Switch><div className="contents">
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/book/:id" exact component={Books} />
          <Route path="/:username/sell/:book_id" exact component={Sell} />
          <Route path="/:username/buy/:book_id" exact component={Buy} />
          <Route path="/user/:username/wishlist" exact component={Wishlist} />
          <Route path="/user/:username/sales" exact component={Sales} />
          <Route path="/user/:username/requests" exact component={Requests} />
          <Route path="/purchase/:sell_id" exact component={Purchase} />
          <Route path="/user/:username/sales/:sell_id/deliver" exact component={DeliverSale} />
          <Route path="/delivery-user/:username/deliveries" exact component={MyDeliveries} />
          <Route path="/user/:username" exact component={Profile} />
          <Route path="/delivery-user/:username" exact component={Profile} />
        </div></Switch>
      </Router>
    </div>
  );
}

export default App;
