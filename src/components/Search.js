import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import "../stylesheets/Search.css"
import { Redirect, useHistory } from 'react-router-dom';

function Search() {
    const [searchText, changeSearchText] = useState("");
    const [searchResults, changeSearchResults] = useState([]);
    const history = useHistory();
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

    const finishSearch = (e) => {
        e.preventDefault();
        console.log(e.key);
        history.push(`/search?q=${searchText.replace(/ /g,"+")}`);
    }

    const searchBook = (e) => {
        //history.push(`/book/${book.id}`)
        //console.log(e.nativeEvent.key);
            console.log(e);
        e.preventDefault();
    }
    
    
    return (
        <div>
            <form onSubmit = {(e) => finishSearch(e) }>
                
                <input type = "text" placeholder = "Search for a book" value = {searchText} onChange = {(e) => changeSearchText(e.target.value)} list = "searchList" onSelect = {(e) => searchBook(e)} />
                <datalist id = "searchList" >
                    {searchResults.map((result, index) => {
                        console.log(result.id, result.volumeInfo.title);
                        return (<option value = {result.volumeInfo.title} key ={result.id} id = {result.id}/>
                        )
                    })}
                    {
                    /* <option value = "random"/>
                    <option value = "anotherrandom"/> */}
                </datalist>

                
            </form>
            {/* <button onClick= {(e) => console.log(searchResults)}>button</button> */}

            
        </div>
    )
}

export default Search
