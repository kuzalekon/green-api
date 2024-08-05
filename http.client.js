(function (global) {

  function createHttpError(message) {
    const error = new Error(message);
    error.name = 'HttpError';

    return error;
  }

  function createHttpClient({ baseUrl, headers = {}, timeout = 5000, mode = 'no-cors' }) {
    const handleError = ({ message }) => {
      throw createHttpError(message);
    }

    const request = (options) => {
      return fetch(new URL(options.url, baseUrl), {
        headers,
        method: options.method, 
        body: options.body,
      });
    }

    return Object.freeze({
      get: (url) => request({ url, timeout, method: 'GET' }).catch(handleError),
      post: (url, body) => request({ url, body, timeout, method: 'POST' }).catch(handleError),
    });
  }

  global.createHttpClient = createHttpClient;

})(globalThis);
