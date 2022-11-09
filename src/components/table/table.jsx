import React from "react";
import { tableKeys } from "../../constants/app-constants";
import "./index.scss";

function Table(props) {
  const { data } = props;
  return (
    <>
      <table className="entries">
            <tr>
            <td>{data[tableKeys.NAME]}</td>
            <td>{data[tableKeys.AGE]}</td>
          </tr>
      </table>
    </>
  );
}

export default Table;
