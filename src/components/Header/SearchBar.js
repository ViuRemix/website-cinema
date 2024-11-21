// SearchBar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ searchMovies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      searchMovies(searchQuery);
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      searchMovies(searchQuery);
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="input-group mb-3 header-search">
      <input
        type="text"
        className="form-control"
        placeholder="Tìm kiếm phim hay..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        aria-label="Tìm kiếm phim hay..."
        aria-describedby="search-icon"
      />
      <button
        className="btn btn-search"
        type="button"
        onClick={handleSearchClick}
      >
        <i className="bx bx-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
