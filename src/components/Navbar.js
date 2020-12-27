import React from 'react';
import { useHistory } from 'react-router-dom';
import "../App.css";
import Search from './Search';

function Navbar() {
    var history = useHistory();


    const homeRedirect = (event) => {
        history.push("/");
    }
    return (
        <div>
            <nav>
                <h3 onClick={ history.push("/")} className = "logo">Book Exchange</h3>
                <Search />  

                
            </nav>
        </div>
    )
}

export default Navbar
