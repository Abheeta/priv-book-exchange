import React from 'react'
import "../stylesheets/Home.css"
import sellbook from "../stylesheets/sellbook.jpg"
import pngbuybook from "../stylesheets/pngbuybook.png"
import deliverbook from "../stylesheets/deliverbook.png"

function Home() {
    return (
        <div className="Home">
            <div className="welcome">
            </div>
            <div className="welcomeText">
                <h1>Welcome to Book Exchange</h1>
                An easy way to find books and give them
                a second home.
            </div>
            <h1 style={{fontFamily:"'Times New Roman', Times, serif"}}>How does it work?</h1>
            <div className="howto">
                <img className="image" src = {sellbook}></img>
                <div className="howToContent">
                    <h3>Sell books</h3>
                    <b>Add your old books to our bookshelf<br></br>
                    so that it can reach a second home.<br></br>
                    Sell them at a price of your choice</b>
                </div>
            </div>
            <div className="howto">
                <div className="howToContent">
                    <h3>Buy books</h3>
                    <b>Buy books of your choice from our <br></br>
                    bookshelf at affordable prices. <br></br>
                    Read first-hand opinions of the books <br></br>
                    from sellers before you buy them.</b>
                </div>
                <img className="image" src = {pngbuybook}></img>

            </div>
            <div className="howto">
                <img className="deliverImage" src = {deliverbook}></img>
                <div className="howToContent">
                    <h3>Get Books Delivered</h3>
                    <b>Have books delivered at your doorstep<br></br>
                    for exchanges within the same city.
                    </b>
                </div>
                

            </div>
                        
        </div>
    )
}

export default Home
