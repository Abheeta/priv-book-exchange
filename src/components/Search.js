import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import "../stylesheets/Search.css"

function Search() {
    const [searchText, changeSearchText] = useState("");
    const [searchResults, changeSearchResults] = useState([]);
    useEffect(() => {
        if (searchText === ""){
            changeSearchResults([]);
        }
        else{
            Axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchText}&maxResults=5`).then((result) => {
                if(result.data.totalItems === 0){
                    changeSearchResults([]);
                }   
                else
                
                    changeSearchResults(result.data.items);

            });
        }
    },[searchText])
    
    return (
        <div>
            <form>
                
                <input type = "text" placeholder = "Search for a book" value = {searchText} onChange = {(e) => changeSearchText(e.target.value)} list = "searchList" />
                <datalist id = "searchList" >
                    {searchResults.map((result, index) => {
                        console.log(result);
                        return (<option value = {result.volumeInfo.title} />)
                    })}
                    {
                    /* <option value = "random"/>
                    <option value = "anotherrandom"/> */}
                </datalist>
            </form>
            <button onClick= {(e) => console.log(searchResults)}>button</button>

            
        </div>
    )
}

export default Search
