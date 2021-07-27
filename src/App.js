import React, { useEffect, useState } from "react";
import "./App.css";
import ImageCard from "./ImageCard";

const pageNumber = 1;

function App() {
  const [pictures, setPictures] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setpage] = useState(pageNumber);

  useEffect(() => {
    const getAllPhotos = async () => {
      await fetch(
        "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=4c3bbea6f1816a65e5188d6322acc462&format=json&nojsoncallback=1"
      )
        .then((response) => response.json())
        .then((data) => {
          setPictures(data.photos.photo);
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
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      scrollToFind();
    }
  };

  function updateSearchValue(event) {
    setSearchValue(event.target.value);
  }

  function search(event) {
    event.preventDefault();
    console.log("searching...");
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e58db5c37e31c2add7ff47165e528488&safe_search=1&tags=${searchValue}&format=json&nojsoncallback=1`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log({ data });
        setPictures(data.photos.photo);
      });
  }

  //  function loadimages(numImages = 10){
  //    for(let i = 0;i< numImages;i++){
  //      fetch(
  //      "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=4c3bbea6f1816a65e5188d6322acc462&format=json&nojsoncallback=1"
  //    )
  //    .then((response)=>response.json())
  //    .then((data)=>{
  //     setPictures(data.photos.photo);
  //    }

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-search-section">
          <div>
            <h2>Search Photos</h2>
            <form onSubmit={search}>
              <input
                type="text"
                value={searchValue}
                onChange={updateSearchValue}
              ></input>
            </form>
          </div>
        </div>
      </header>

      <div className="my-image">
        {pictures.length > 0 &&
          pictures.map((img) => <ImageCard image_src={img} key={img.id} />)}
      </div>
    </div>
  );
}
export default App;
