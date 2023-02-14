export const convertStringToDate = (value: string) => {
    const dateMap = {
        day: value.split('/')[0],
        month: value.split('/')[1],
        year: value.split('/')[2]
    };
    const utcDate = `${dateMap.month}/${dateMap.day}/${dateMap.year}`;
    
    return new Date(utcDate);
}

export const convertDateToString = (value: Date) => {
    const date = value.getDate();
    const month = value.getMonth();
    const year = value.getFullYear();

    let string = '';

    if (date < 10) string += `0${date}/`;
    else string += `${date}/`;

    if (month < 10) string += `0${month + 1}/`;
    else string += `${month}/`;

    string += year;

    return string.toString();
}

export const isValidDate = (value: string, semester: string) => {
    if (value.length !== 10) return false;
    let isValid = false;
    const date = value.split('/');
    const day = Number(date[0]);
    const month = Number(date[1]);
    const year = Number(date[2]);

    const currentYear = Number(semester.split('/')[1]);

    if (year !== currentYear) return false;
    if (month > 12 || month <= 0) return false

    const numberOfDays = new Date(year, month, 0).getDate();
    isValid = numberOfDays >= day;

    return isValid;
}

export const getMonthName = (value: string) => {
    const month = Number(value);
    let monthName = '';

    switch (month) {
        case 1:
            monthName = 'Janeiro';
            break;
        case 2:
            monthName = 'Fevereiro';
            break;
        case 3:
            monthName = 'Março';
            break;
        case 4:
            monthName = 'Abril';
            break;
        case 5:
            monthName = 'Maio';
            break;
        case 6:
            monthName = 'Junho';
            break;
        case 7:
            monthName = 'Julho';
            break;
        case 8:
            monthName = 'Agosto';
            break;
        case 9:
            monthName = 'Setembro';
            break;
        case 10:
            monthName = 'Outubro';
            break;
        case 11:
            monthName = 'Novembro';
            break;
        case 12:
            monthName = 'Dezembro';
            break;
    }

    return monthName;
}