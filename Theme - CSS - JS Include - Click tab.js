(function () {
  var WIDGET_CLASS = 'v63bbd51859fb3050f8776ff4b4b3e387';

  function activateLastTab(widgetContainer) {
    var tabs = widgetContainer.querySelectorAll('ul.nav-tabs > li.uib-tab');
    if (!tabs.length) return;

    var lastTab = tabs[tabs.length - 1];
    var lastLink = lastTab.querySelector('a');

    if (lastLink && !lastTab.classList.contains('active')) {
      lastLink.click();
    }
  }

  function processAllWidgets() {
    document.querySelectorAll('.' + WIDGET_CLASS).forEach(activateLastTab);
  }

  function start() {
    processAllWidgets(); // in case it's already rendered

    var observer = new MutationObserver(processAllWidgets);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.body) {
    start();
  } else {
    document.addEventListener('DOMContentLoaded', start);
  }
})();