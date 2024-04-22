const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export default debounce;