import React, { useState, useEffect } from "react";
import { searchAPI } from "../../actions/search/action";
import close from "../../assets/images/close.svg";
import "./index.scss";

export const Search = () => {
  const [searchApiData, setSearchApiData] = useState();
  const [userSearchedData, setUserSearchedData] = useState();
  const [tiles, setTiles] = useState(false);

  const handleSearchFunc = () => {
    // debugger;
    let payload = {
      keyword: userSearchedData,
    };

    searchAPI((res) => {
      setSearchApiData(res.content);
      setTiles(true);
    }, payload);
  };

  const searchCloseFunc = () => {
    setTiles(false);
    setUserSearchedData("");
  };

  return (
    <div className="search">
      <div className="search__subDiv">
        <p className="">Search Here</p>
        <div className="search__subDiv-innerDiv">
          <input
            type="search"
            value={userSearchedData}
            placeholder="Search"
            onChange={(e) => setUserSearchedData(e.target.value)}
            className="search__subDiv-searchtag"
          />
          <input
            type="button"
            value="Submit"
            className="search__subDiv-btn"
            onClick={() => handleSearchFunc()}
          />
        </div>
      </div>
      {tiles && (
        <>
          <div className="search__headerDiv">
            <p className="search__headerDiv-phrase">Search Results</p>
            <img
              src={close}
              className="search__headerDiv-closeImg"
              onClick={() => searchCloseFunc()}
            />
          </div>
          {searchApiData.result.length > 0 ? (
            <>
              {searchApiData &&
                searchApiData.result &&
                searchApiData.result.map((data) => (
                  <div className="search__tilesDiv">
                    <p className="search__tilesDiv-phrase">
                      {data._source.file_type == "pdf" ? (
                        data._source.content + data.file_name + data.file_type + data.id + data.timestamp
                      ) : (
                        JSON.stringify(data._source)
                      )}
                    </p>
                  </div>
                ))}
            </>
          ) : (
            <p className="search__noResults">
              OOPS, No results found! Please try with different keyword.
            </p>
          )}
        </>
      )}
    </div>
  );
};
