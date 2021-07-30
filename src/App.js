import React, { useEffect, useState } from "react";
import "./App.css";
import ImageCard from "./ImageCard";

const pageNumber = 1;

// the input box data is store in searchValue

function App() {
  const [pictures, setPictures] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setpage] = useState(pageNumber);
  const [queries, setQueries] = useState(null);

  useEffect(() => {
    const getAllPhotos = async () => {
      await fetch(
        "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=4c3bbea6f1816a65e5188d6322acc462&format=json&nojsoncallback=1"
      )
        .then((response) => response.json())
        .then((data) => {
          setPictures([...pictures.concat(data.photos.photo)]);
        });
    };



    getAllPhotos();
  }, [page]);

  const scrollToFind = () => {
    setpage(page + 1);
  };
  //window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
  window.onscroll = function () {
    
    if (
      window.scrollY /
      document.documentElement.scrollHeight >=0.95
    )
   
    {
       console.log("working" ,window.scrollY , window.innerHeight,
      document.documentElement.scrollHeight)
      scrollToFind();

    }
  };

  function updateSearchValue(event) {
    // console.log(event.target.value)
    setSearchValue(event.target.value);
    
  }

  function search(event) {
    event.preventDefault();
    console.log("searching...");
    let tag = searchValue;
    if(event.target.query){
      tag = event.target.query
    }
    
   
    setQueries(null)
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e58db5c37e31c2add7ff47165e528488&safe_search=1&tags=${tag}&format=json&nojsoncallback=1`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log({ data });
        setPictures(data.photos.photo);
        
      });
    let names = JSON.parse(localStorage.getItem("names"));

    if (names == null) {
      names = [];
    }
    if (searchValue.length > 0 && !names.includes(searchValue)) {
      names.push(searchValue);
      if(names.length>5){
        names.splice(0,1)
      }
      localStorage.setItem("names", JSON.stringify(names));
    }
  }

  //  function getData(){
  //    const data = (localStorage.getItem('names'))
  //    console.log(data)
    
  //  }
  const searchQuery = () => {
    console.log("ff");
    setSearchValue("query");
    // search()
  };

  
  

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-search-section">
          <div>
            <h2>Search Photos</h2>
            <form
              onSubmit={search}
              onBlur={() => {
                setQueries(null);
              }}
            >
              <input
                type="text"
                value={searchValue}
                onFocus={() => {
                  const data = JSON.parse(localStorage.getItem("names"));
                  setQueries(data);
                }}
                onChange={updateSearchValue}
              ></input>
              <ul id="query-list">
                {queries &&
                  queries.map((query) => (
                    <li
                      key={query}
                      onClick={(e) => {
                        console.log("ff");
                        setSearchValue(query);
                        e.target.query = query;
                        search(e);
                      }}
                    >
                      {query}
                    </li>
                  ))}
                {/* <li key="clear_btn" onClick={searchQuery}>
                  <button>JJ</button>
                </li> */}
              </ul>
            </form>
          </div>
        </div>
      </header>

      <div className="my-image">
        {pictures.length > 0 &&
          pictures.map((img, i) => (
            <ImageCard image_src={img} key={img.id + i} />
          ))}
      </div>
    </div>
  );
}
export default App;
