import { fetchCall } from "../../utils/ajax";
import { API_CONSTANTS, API_METHODS } from "../../constants/api-constants";

export const uploadFileAPI = (callback, formData) => {
  // debugger
  const url = `${API_CONSTANTS.UPLOAD_FILE}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    formData,
    {isFileUpload: true}
  );
};
