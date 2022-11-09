import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { tableKeys } from "../../constants/app-constants";
import "./index.scss";

function CustomTable(props) {
  const { data } = props;
  const [key, setKey] = useState();
  useEffect(() => {
    debugger
    setKey(Object.keys(data));
  }, [data]);

  return (
    <>
      <table className="entries">
        {key?.length &&
          key?.map((item) => {
            return (
            <tr>
              <td>{data[item]}</td>
            </tr>
            );
          })}
      </table>
    </>
  );
}

export default CustomTable;
