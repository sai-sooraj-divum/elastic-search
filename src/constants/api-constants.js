const BaseUrl = {
  BASE_URL: `${process.env.REACT_APP_AUTH_BASE_URL}`,
}
console.log("BASE_URL",process.env.REACT_APP_AUTH_BASE_URL);

export const API_CONSTANTS = {
  UPLOAD_FILE: `${BaseUrl.BASE_URL}/api/v1/es/insert_data`,
  SEARCH: `${BaseUrl.BASE_URL}/api/v1/es/search`,
}

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
  PUT: "PUT",
}