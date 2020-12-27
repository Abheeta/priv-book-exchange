import React from 'react';
import { useParams } from 'react-router-dom'

function Books() {
    const params = useParams();
    console.log(params);
    return (
        <div>
            
        </div>
    )
}

export default Books
