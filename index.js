(function main(global, $) {

  const API_URL = 'https://1103.api.green-api.com';

  const httpClient = global.createHttpClient({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'GREEN-API-JS-CLIENT',
    }
  });

  const apiReqeustBuilder = global.createApiRequestBuilder({
    httpClient,
    apiUrl: API_URL,
  });

  const instanceInput = $.querySelector("#instanceInput");
  const tokenInput = $.querySelector("#tokenInput");
  const getSettingsButton = $.querySelector("#getSettingsButton");
  const getStateInstanceButton = $.querySelector("#getStateInstanceButton");
  const sendMessageChatIdInput = $.querySelector("#sendMessageChatIdInput");
  const sendMessagecontentInput = $.querySelector("#sendMessagecontentInput");
  const sendMessageButton = $.querySelector("#sendMessageButton");
  const sendFileChatIdInput = $.querySelector("#sendFileChatIdInput");
  const sendFileUrlInput = $.querySelector("#sendFileUrlInput");
  const sendFileButton = $.querySelector("#sendFileButton");
  const resultOutput = $.querySelector("#resultOutput");

  const debounce = (callback, wait = 250) => {
    let timeout = null;
    return (...args) => {
      global.clearTimeout(timeout);
      global.setTimeout(() => callback.apply(null, args), wait);
    }
  }

  const toggleControls = debounce(() => {
    const isInstanceSpecified = !!instanceInput.value;
    const isTokenSpecified = !!tokenInput.value;

    const isDisabled = !(isInstanceSpecified && isTokenSpecified);

    getSettingsButton.disabled = isDisabled;
    getStateInstanceButton.disabled = isDisabled;
    sendMessageChatIdInput.disabled = isDisabled;
    sendMessagecontentInput.disabled = isDisabled;
    sendMessageButton.disabled = isDisabled;
    sendFileChatIdInput.disabled = isDisabled;
    sendFileUrlInput.disabled = isDisabled;
    sendFileButton.disabled = isDisabled;
  });

  instanceInput.addEventListener("change", toggleControls);
  tokenInput.addEventListener("change", toggleControls);

  getSettingsButton.addEventListener("click", async () => {
    const getSettings = apiReqeustBuilder
      .setInstance(instanceInput.value)
      .setToken(tokenInput.value)
      .setMethod('getSettings')
      .build();

    const response = await getSettings();
    const json = await response.json();

    resultOutput.value = JSON.stringify(json, null, 2);
  });

  getStateInstanceButton.addEventListener("click", async () => {
    const getStateInstance = apiReqeustBuilder
      .setInstance(instanceInput.value)
      .setToken(tokenInput.value)
      .setMethod('getStateInstance')
      .build();

    const response = await getStateInstance();
    const json = await response.json();

    resultOutput.value = JSON.stringify(json, null, 2);
  });

  sendMessageButton.addEventListener("click", async () => {
    const payload = {
      chatId: sendMessageChatIdInput.value,
      message: sendMessagecontentInput.value,
    }

    const sendMessage = apiReqeustBuilder
      .setInstance(instanceInput.value)
      .setToken(tokenInput.value)
      .setMethod('sendMessage')
      .build();

    const response = await sendMessage(payload);
    const json = await response.json();

    resultOutput.value = JSON.stringify(json, null, 2);
  });

  sendFileButton.addEventListener("click", async () => {
    const payload = {
      chatId: sendFileChatIdInput.value,
      urlFile: sendFileUrlInput.value,
      fileName: 'green-api-test.unknown',
    }

    const sendFileByUrl = apiReqeustBuilder
      .setInstance(instanceInput.value)
      .setToken(tokenInput.value)
      .setMethod('sendFileByUrl')
      .build();

    const response = await sendFileByUrl(payload);
    const json = await response.json();

    resultOutput.value = JSON.stringify(json, null, 2);
  });

})(globalThis, globalThis.document);
