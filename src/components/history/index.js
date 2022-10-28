import React, {useState, useEffect} from "react";
import { historyAPI } from "../../actions/history";
import Loader from "../loader";
import './index.scss';

export const History = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [historyApiData, setHistoryApiData] = useState();

  useEffect(() => {
    historyAPI((res) => {
      setIsLoading(false);
      setHistoryApiData(res.content);
    })
  },[]);

  return (
    <div className="history">
      {console.log("history", historyApiData)}
      <div className="history__subDiv">
        <p className="history__subDiv-title">List Of All Uploaded Files</p>
        <div className="history__subDiv-resultDiv">
          {historyApiData &&
            historyApiData.result &&
            historyApiData.result.map((data) => (
              <div className="resultDiv__subDiv">
                <p className="resultDiv__subDiv-phrase">File Name : {data._source.file_name}</p>
                <p className="resultDiv__subDiv-phrase">File Type: {(data._source.file_type).toUpperCase()}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
