import axios from 'axios';
import {
  API_METHODS,
  API_CONSTANTS,
} from '../constants/api-constants';
// import { logout } from './services';

let ajaxRequest = null;

export const fetchCall = (callback, url, method, payload, ...args) =>
  new Promise((resolve, reject) => {
    const accessToken = localStorage.getItem('access_token');
    // const jwtToken = localStorage.getItem('jwt_token');

    const restArgs = args.length && args[0];
    let options = {};

    let headers;
    if(restArgs.isFileUpload === true){
      headers = {
        'Content-Type': 'multipart/form-data',
      }; 
    } else {
      headers = {
        'Content-Type': 'application/json', 
        // authtoken: accessToken
      };
    }

    if(accessToken){
      headers['x-access-token'] = accessToken;
    }

    // if(jwtToken){
    //   headers['jwt-token'] = jwtToken;
    // }

    if (restArgs?.isEmptyHeader) {
      //
    } 

    // else if (restArgs?.isCashfreeCall) {
    //   headers['x-client-id'] = `${process.env.REACT_APP_CASHFREE_CLIENT_ID}`;
    //   headers[
    //     'x-client-secret'
    //   ] = `${process.env.REACT_APP_CASHFREE_CLIENT_SECRET}`;
    // }
    else {
      // headers.authtoken = accessToken;
      headers['Access-Control-Allow-Origin'] = '*'
    }

    if (restArgs?.isUrlEncoded) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (method === API_METHODS.GET) {
      options = {
        method,
        headers,
        url
      };
    } else {
      // debugger;
      options = {
        method,
        data: payload,
        headers,
        url
      };
    }

    if (restArgs?.isCancelPreviousAPI) {
      // debugger
      if (ajaxRequest) {
        ajaxRequest.cancel();
      }
      ajaxRequest = axios.CancelToken.source();
      options.cancelToken = ajaxRequest.token;
    }

    if (restArgs?.isFileUpload) {
      options.onUploadProgress = (progressEvent) => {
        callback(progressEvent);
      };
    }

    // fetch(url, options)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     callback(res);
    //     resolve(res);
    //   })
    //   .catch((err) => {
    //     callback(err);
    //     return err;
    //   });

    axios(options)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        if (error && error.response && error.response.status === 400) {
          callback(error.response.data);
          return;
        }
        callback(error);
      });
  });

// function progressHandler(event) {
//   console.log('ZA');
//   // alert("Uploaded " + event.loaded + " bytes of " + event.total)
//   // _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
//   // var percent = (event.loaded / event.total) * 100;
//   // _("progressBar").value = Math.round(percent);
//   // _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
// }

// let ajaxRequest = null;

let failedRequests = [];
let isRefreshing = false;

function processQueue(error, token = null) {
  failedRequests.forEach(({ promise, config }) => {
    if (error) {
      promise.reject(error);
    } else {
      config.headers.authtoken = token || '';

      axios
        .request(config)
        .then((response) => {
          promise.resolve(response);
        })
        .catch((error) => {
          // promise.reject(error);
        });
    }
  });
  isRefreshing = false;
  failedRequests = [];
}

export async function makeHttpRequestForRefreshToken() {
  const url = API_CONSTANTS.REFRESH_TOKEN;
  const payload = {
    refresh_token: localStorage?.getItem('refresh_token'),
    // client_id: CLIENT_DETAILS.CLIENT_ID,
    // client_secret: CLIENT_DETAILS.CLIENT_SECRET,
    grant_type: 'refresh_token'
  };

  let formBody = [];
  const keys = Object.keys(payload);

  keys.forEach((value) => {
    formBody.push(`${value}=${payload[value]}`);
  });

  formBody = formBody.join('&');

  return new Promise((resolve, reject) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url,
        data: formBody
      };
      axios(options)
        .then((response) => {
          if (response && response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            resolve(response.access_token);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
          // logout();
        });
    } catch (error) {
      reject(error);
    }
  });
}

axios.interceptors.response.use(
  (response) => response?.data, // Return a successful response back to the calling service
  (error) => {
    const { response, config } = error;
    let errorResponse = null;
    if (!config || !response) {
      if (error.message === 'Network Error') {
        errorResponse = {
          error: {
            code: 503,
            message: error.message
          }
        };
      }
      return errorResponse;
    }
    // Return any error which is not due to authentication back to the calling service
    // console.log("config===" ,response, config, config.__isRetryRequest)
    if (response && response.status === 401 && config) {
      if (isRefreshing) {
        try {
          return new Promise((resolve, reject) => {
            const options = {
              promise: {
                resolve,
                reject
              },
              config
            };
            failedRequests.push(options);
          });
        } catch (e) {
          return e;
        }
      }

      isRefreshing = true;
      config.__isRetryRequest = true;
      // Try request again with new token
      return makeHttpRequestForRefreshToken()
        .then((response) => {
          // New request with new token
          const { config } = error;
          processQueue(null, response);
          const token = response;
          config.headers.authtoken = token || '';

          // config.__isRetryRequest = false;
          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((error) => {
          // reject(error);
        });
    }
    return new Promise((resolve, reject) => {
      // console.log('Interceptor Response: ', error.response);
      reject(error);
    });
  }
);
