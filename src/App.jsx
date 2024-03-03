import { useState } from "react";

import Header from "./components/header/Header";
import GenreList from "./components/genreList/GenreList";

import { genreListData, cardListData } from "./data.jsx";

import Filter from "./components/filter/Filter.jsx";
import Pagination from "./components/pagination/Pagination.jsx";
import CardList from "./components/cardList/CardList.jsx";

export function App() {
  const genreList = [...genreListData];
  const cardList = [...cardListData];

  const [collectionList, setCollectionList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function handleClickInCollection(card) {
    if (collectionList.includes(card.id)) {
      setCollectionList((prevCollectionList) =>
        prevCollectionList.filter((item) => item !== card.id)
      );
    } else {
      setCollectionList((prevCollectionList) => [
        ...prevCollectionList,
        card.id,
      ]);
    }
  }

  function handleClickInFavorites(card) {
    if (favoriteList.includes(card.id)) {
      setFavoriteList((prevFavoriteList) =>
        prevFavoriteList.filter((item) => item !== card.id)
      );
    } else {
      setFavoriteList((prevFavoriteList) => [...prevFavoriteList, card.id]);
    }
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const filteredList = cardList.filter((item) => {
    return item.title.toLowerCase().indexOf("") !== -1;
  });

  const screenWidth = window.innerWidth;
  const pageSize = screenWidth < 800 ? 3 : 8;

  const totalPages = Math.ceil(filteredList.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, filteredList.length - 1);
  const currentPageItems = filteredList.slice(startIndex, endIndex + 1);

  return (
    <>
      <Header
        favoriteCount={favoriteList.length}
        collectionCount={collectionList.length}
      />
      <main className="main">
        <div className="container">
          <Filter genres={genreList} />
          <GenreList genres={genreList} />

          <CardList
            cardList={currentPageItems}
            collectionList={collectionList}
            favoriteList={favoriteList}
            handleClickInCollection={handleClickInCollection}
            handleClickInFavorites={handleClickInFavorites}
          />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </>
  );
}
