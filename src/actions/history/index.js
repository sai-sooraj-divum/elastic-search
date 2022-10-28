import { fetchCall } from "../../utils/ajax";
import { API_CONSTANTS, API_METHODS } from "../../constants/api-constants";

export const historyAPI = (callback) => {
  const url = `${API_CONSTANTS.HISTORY}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.GET,
  );
};