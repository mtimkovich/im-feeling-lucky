chrome.omnibox.onInputEntered.addListener(text => {
  chrome.tabs.update({
    url: `http://www.google.com/search?btnI=1&q=${text}`
  }, ignoreRedirectNotice)
});

/** Skips past the "Redirect Notice". */
function ignoreRedirectNotice() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const redirect = 'https://www.google.com/url?q=';
    if (!changeInfo.url || !tab.url.startsWith(redirect)) {
      return;
    }

    chrome.tabs.update({
      url: tab.url.replace(redirect, '')
    },
    chrome.tabs.onUpdated.removeListener(ignoreRedirectNotice));
  });
}
