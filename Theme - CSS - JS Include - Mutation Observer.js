(function () {
  function deepQueryAll(selector, root = document) {
    let found = [];
    root.querySelectorAll('*').forEach(el => {
      if (el.matches(selector)) found.push(el);
      if (el.shadowRoot) found = found.concat(deepQueryAll(selector, el.shadowRoot));
    });
    return found;
  }

  function injectIntoRoot(root, styleId, cssText) {
    if (!root.querySelector('#' + styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cssText;
      root.appendChild(style);
    }
  }

  function injectDeep(selector, styleId, cssText) {
    deepQueryAll(selector).forEach(el => {
      const root = el.getRootNode();
      injectIntoRoot(root === document ? document.head : root, styleId, cssText);
    });
  }

  function injectAll() {
    injectDeep('.header-message-font-size-md', 'injected-font-fix', '.header-message-font-size-md { font-size: 22px !important; color: #000 !important; font-family: "Roobert TRIAL" !important; font-style: normal !important; font-weight: 700 !important; line-height: normal !important; }');
    injectDeep('.title-font-size-md', 'injected-font-fix-title', '.title-font-size-md { font-size: 24px !important; }');
  }

  injectAll();

  const observer = new MutationObserver(() => injectAll());
  observer.observe(document.documentElement, { childList: true, subtree: true });

  const poll = setInterval(injectAll, 500);
  setTimeout(() => clearInterval(poll), 60000);
})();