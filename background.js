chrome.omnibox.onInputEntered.addListener(text => {
  chrome.tabs.update({
    url: `http://www.google.com/search?btnI=1&q=${text}`
  }, ignoreRedirectNotice)
});

/** Skips past the "Redirect Notice". */
function ignoreRedirectNotice() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.url) {
      return;
    }

    const redirect = 'https://www.google.com/url?q=';
    if (!tab.url.startsWith(redirect)) {
      chrome.tabs.onUpdated.removeListener(ignoreRedirectNotice);
      return;
    }

    chrome.tabs.update({
      url: tab.url.replace(redirect, '')
    },
    chrome.tabs.onUpdated.removeListener(ignoreRedirectNotice));
  });
}
