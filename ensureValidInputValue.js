const ensureValidInputValue = (() => {
  const cache = new Map();

  const register = (
    selector,
    matcher,
    { parent = document, validationMessage = "Invalid input." } = {}
  ) => {
    if (typeof selector !== "string")
      throw new Error(`Invalid selector value. Must be string. (${selector})`);
    if (!(matcher instanceof RegExp))
      throw new Error(`Invalid matcher value. Must be RegEx. (${matcher})`);
    if (!(parent instanceof Element) && !(parent instanceof Document))
      throw new Error(
        `Invalid parent value. Must be Element or Document. (${parent})`
      );
    if (typeof validationMessage !== "string")
      throw new Error(
        `Invalid validationMessage value. Must be string. (${validationMessage})`
      );

    const registerInput = (element) => {
      if (!(element instanceof HTMLInputElement))
        throw new Error(`Invalid target. Must be input. (${element})`);
      if (cache.has(element))
        throw new Error(`Invalid target. Already cached. (${element})`);

      const getCache = () => {
        const cached = cache.get(element);
        if (!cached)
          throw new Error(
            `Attempted to access non-existent cache for ${element}`
          );
        return cached;
      };

      const handleInput = () => {
        const cached = getCache();
        if (!cached.enabled) return;
        if (matcher.test(element.value)) {
          element.setCustomValidity("");
          cached.value = element.value;
        } else element.setCustomValidity(validationMessage);
      };
      const handleBlur = () => {
        const cached = getCache();
        if (!cached.enabled) return;
        if (!matcher.test(element.value)) element.value = cached.value;
      };

      element.addEventListener("input", handleInput);
      element.addEventListener("blur", handleBlur);

      cache.set(element, {
        value: element.value,
        enabled: true,
      });

      return {
        remove: () => {
          element.removeEventListener("input", handleInput);
          element.removeEventListener("blur", handleBlur);
          cache.delete(element);
        },
        enable: () => {
          const cached = getCache();
          cached.enabled = true;
        },
        disable: () => {
          const cached = getCache();
          cached.enabled = false;
        },
        toggle: () => {
          const cached = getCache();
          cached.enabled = !cached.enabled;
        },
      };
    };

    const inputs = [...parent.querySelectorAll(selector)];
    const cleanups = inputs.map(registerInput);

    return {
      remove: () => {
        cleanups.forEach(({ remove }) => remove());
      },
      enable: () => {
        cleanups.forEach(({ enable }) => enable());
      },
      disable: () => {
        cleanups.forEach(({ disable }) => disable());
      },
      toggle: () => {
        cleanups.forEach(({ toggle }) => toggle());
      },
    };
  };

  return register;
})();
