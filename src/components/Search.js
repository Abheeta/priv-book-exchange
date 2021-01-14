import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import "../stylesheets/Search.css"
import { useHistory } from 'react-router-dom';

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

    const finishSearch = async (e) => {
        e.preventDefault();
        // await changeSearchText("");
        // history.push(`/search?q=${searchText.replace(/ /g,"+")}`);
    }

    const searchBook =  (e, book) => {
        e.preventDefault();
        changeSearchText("");
        history.push(`/book/${book.id}`)
    }
    
    return (
        <div>
            <form onSubmit = {(e) => finishSearch(e) }>
                <input type="text" className="search" placeholder="Search for a book" value={searchText} onChange={(e) => changeSearchText(e.target.value)}/>
                {searchResults.length > 0 ?
                (<div className="dropdown-content">
                    {searchResults.map((result, index) => {
                        return(<div className="links" key={result.id} onClick={(e) => searchBook(e, result)}>{result.volumeInfo.title}</div>)
                    })}
                </div>) :
                (<div></div>)
            }
            </form>
        </div>
    )
}

export default Search
