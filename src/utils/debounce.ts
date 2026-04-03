export const debounce = <TArgs extends unknown[]>(
    callback: (...args: TArgs) => void,
    waitMs: number,
) => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    return (...args: TArgs) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            callback(...args);
        }, waitMs);
    };
};
