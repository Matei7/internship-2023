export function debounce(func, timeout = 800) {
    let timer={};
    return (...args) => {
        clearTimeout(timer[args[0]]);
        timer[args[0]] = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}


