(function (global) {

  class ApiRequestBuilder {
    instance = null;
    token = null;
    method = null;

    httpClient = null;
    apiUrl = null;

    constructor({ httpClient, apiUrl }) {
      this.httpClient = httpClient;
      this.apiUrl = apiUrl;
    }

    setInstance(value) {
      this.instance = value;

      return this;
    }

    setToken(value) {
      this.token = value;

      return this;
    }

    setMethod(value) {
      this.method = value;
      
      return this;
    }

    build() {
      return (payload) => {
        const url = new URL(`/waInstance${this.instance}/${this.method}/${this.token}`, this.apiUrl);

        const response = !!payload
          ? this.httpClient.post(url, JSON.stringify(payload))
          : this.httpClient.get(url);

        return response;
      }
    }
  }

  const createApiRequestBuilder = ({ httpClient, apiUrl }) => {
    return new ApiRequestBuilder({ httpClient, apiUrl });
  }

  global.createApiRequestBuilder = createApiRequestBuilder;

})(globalThis);
