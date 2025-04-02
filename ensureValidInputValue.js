const ensureValidInputValue = (() => {
  const cache = new Map();

  function track(targeter, matcher, { parent = document } = {}) {
    if (typeof targeter != "string")
      throw new Error(`Targeter must be instance of string: ${targeter}`);
    if (!(matcher instanceof RegExp))
      throw new Error(`Matcher must be instance of RegExp: ${matcher}`);
    const inputs = parent.querySelectorAll(targeter);
    inputs.forEach((element) => {
      if (!(element instanceof HTMLInputElement))
        throw new Error(`Invalid selector result (not input): ${element}`);
      const inputHandler = () => {
        const cached = cache.get(element);
        if (!matcher.test(element.value)) {
          element.value = cached.value;
        } else {
          cache.set(element, { ...cached, value: element.value });
        }
      };
      cache.set(element, {
        value: element.value,
        handler: inputHandler,
      });
      element.addEventListener("input", inputHandler);
    });

    return {
      remove: () => {
        inputs.forEach((element) => {
          element.removeEventListener("input", inputHandler);
        });
      },
    };
  }

  return track;
})();
