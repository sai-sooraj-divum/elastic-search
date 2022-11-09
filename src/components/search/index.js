import React, { useState, useEffect } from "react";
import { searchAPI } from "../../actions/search/action";
import close from "../../assets/images/close.svg";
import CustomTable from "../customTable/customTable";
import Loader from "../loader";
import Table from "../table/table";
import "./index.scss";
import { tableKeys } from "../../constants/app-constants";

export const Search = () => {
  const [searchApiData, setSearchApiData] = useState();
  const [userSearchedData, setUserSearchedData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [tiles, setTiles] = useState(false);

  const handleSearchFunc = () => {
    setIsLoading(true);
    let payload = {
      keyword: userSearchedData,
    };

    searchAPI((res) => {
      setSearchApiData(res.content);
      setIsLoading(false);
      setTiles(true);
    }, payload);
  };

  const searchCloseFunc = () => {
    debugger;
    setTiles(false);
    setUserSearchedData("");
  };

  return (
    <div className="search">
      {isLoading ? (
        <Loader isSmallLoader />
      ) : (
        <>
          <div className="search__subDiv">
            <p className="">Search Here</p>
            <div className="search__subDiv-innerDiv">
              <input
                type="search"
                value={userSearchedData}
                placeholder="Search"
                onChange={(e) => setUserSearchedData(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    handleSearchFunc();
                  }
                }}
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
                      <div
                        className="search__tilesDiv"
                        style={{
                          display: data._source.file_type !== "pdf" && "none",
                        }}
                      >
                        <p className="search__tilesDiv-phrase">
                          {data._source.file_type == "pdf" &&
                            data._source.content +
                              data.file_name +
                              data.file_type +
                              data.id +
                              data.timestamp}
                        </p>
                      </div>
                    ))}

                  {searchApiData &&
                    searchApiData.result &&
                    searchApiData.result.map(
                      (data, index) =>
                        data._source.file_type !== "pdf" &&
                        data._source &&
                        data._source[tableKeys.NAME] && (
                          <>
                            <div className="search__tilesDiv">
                              <p className="search__tilesDiv-phrase">
                                <table
                                  className="entries"
                                  style={{ display: !(index === 0) && "none" }}
                                >
                                  <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                  </tr>
                                </table>
                                <Table data={data._source} />
                              </p>
                            </div>
                          </>
                        )
                    )}

                  {searchApiData &&
                    searchApiData.result &&
                    searchApiData.result.map(
                      (data) =>
                        !(
                          data._source.file_type !== "pdf" &&
                          data._source &&
                          data._source[tableKeys.NAME]
                        ) && (
                          <div className="search__tilesDiv">
                            <p className="search__tilesDiv-phrase">
                              <CustomTable data={data._source} />
                            </p>
                          </div>
                        )
                    )}
                </>
              ) : (
                <p className="search__noResults">
                  OOPS, No results found! Please try with different keyword.
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
