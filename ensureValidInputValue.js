const ensureValidInputValue = (() => {
  const cache = new Map();

  function track(targeter, matcher, {
    parent = document
  } = {}) {
    if (typeof targeter != "string") throw new Error(`Targeter must be instance of string: ${targeter}`);
    if (!(matcher instanceof RegExp)) throw new Error(`Matcher must be instance of RegExp: ${matcher}`);
    const inputs = parent.querySelectorAll(targeter);
    inputs.forEach(element => {
      if (!(element instanceof HTMLInputElement)) throw new Error(`Invalid selector result (not input): ${element}`);
      cache.set(element, element.value);
      element.addEventListener("input", () => {
        if (!matcher.test(element.value)) {
          element.value = cache.get(element);
        } else {
          cache.set(element, element.value);
        }
      })
    });
  }

  return track;
})();