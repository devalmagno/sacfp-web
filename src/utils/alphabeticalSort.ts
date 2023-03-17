import { convertStringToDate } from "./handlerDate";

const alphabeticalSort = (a: string, b: string) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

export const sortNumericalRising = (a: number, b: number) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

export const ascDateSort = (a: string, b: string) => {
    const dates = [convertStringToDate(a), convertStringToDate(b)];

    let value = 0;

    if (dates[0] < dates[1]) value = -1;
    if (dates[0] > dates[1]) value = 1;

    return value;
}

export const ascTimeSort = (a: number, b: number, dateA: string, dateB: string) => {
    let value = 0;

    if (dateA !== dateB) return value;
    if (a < b) value = -1;
    if (a > b) value = 1;

    return value;
}

export default alphabeticalSort;