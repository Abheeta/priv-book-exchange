import React, {useState} from 'react';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function Test() {
    const [ hello, changeHello ] = useState("hi")
    
    return (
        <div>
            <textarea value={hello} onChange={(e) => {
                changeHello(e.target.value);
                cookies.set("test", e.target.value, { path: "/test" });
            }} />
            <button onClick={(e) => {console.log(cookies.get("test"))}}>Cookie button</button>
        </div>
    )
}

export default Test
