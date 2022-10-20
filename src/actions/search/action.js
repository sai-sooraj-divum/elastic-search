import { fetchCall } from "../../utils/ajax";
import { API_CONSTANTS, API_METHODS } from "../../constants/api-constants";

export const searchAPI = (callback, payload) => {
  const url = `${API_CONSTANTS.SEARCH}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload,
    {isFileUpload: false}
  );
};
