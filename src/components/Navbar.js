import React from 'react';
import { useHistory } from 'react-router-dom';
import "../App.css";
import NavOptions from './NavOptions';
import Search from './Search';

function Navbar() {
    var history = useHistory();


    const homeRedirect = () => {
        history.push("/");
    }
    return (
        <div>
            <nav>
                <h3 onClick={(e) => {homeRedirect()}} className = "logo">Book Exchange</h3>
                <Search />  
                <NavOptions />
            </nav>
        </div>
    )
}

export default Navbar
