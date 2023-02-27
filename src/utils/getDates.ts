import { Activity_dates, Calendar, Schedules } from "../types/DataTypes";
import { ascDateSort, ascTimeSort } from "./alphabeticalSort";
import arrayRange from "./arrayRange";
import { convertDateToString, convertStringToDate } from "./handlerDate";

interface GetDateProps {
    calendar: Calendar;
    schedules: Schedules[];
}

interface FormatedSchedules {
    day: number;
    dayName: string;
    times: number[];
}

interface DateProps {
    date: string;
    description: string;
    time: number;
}

interface SchoolDays {
    month: string;
    schedules: DateProps[];
}

const getDates = (props: GetDateProps) => {
    const startDay = Number(props.calendar.start_date.split('/')[0]);
    const startMonth = Number(props.calendar.start_date.split('/')[1]);
    const endMonth = Number(props.calendar.end_date.split('/')[1]) - 1;
    const year = Number(props.calendar.semester.split('/')[1])

    const date = new Date(year, startMonth - 1, startDay);
    const dates: DateProps[] = [];

    const formatedSchedules: FormatedSchedules[] = getFormatedSchedules(props.schedules);

    let i = date.getMonth() - 1;

    while (i <= endMonth) {
        const numberOfDays = new Date(year, i, 0).getDate();
        const range = arrayRange({
            start: date.getDate(),
            step: 1,
            stop: numberOfDays,
        });

        for (const day of range) {
            date.setDate(day);

            const currentDay = date.getDay();
            let validDay = checkIfHasClassInThisDate(date, formatedSchedules, props.calendar);

            if (currentDay !== 0 && validDay)
                dates.push(...createDateList(date, formatedSchedules, props.calendar));
        }

        date.setMonth(i + 1);
        date.setDate(1);

        i++;
    }

    const ascDates = dates.sort((a, b) => ascDateSort(a.date, b.date)).sort((a, b) => ascTimeSort(a.time, b.time, a.date, b.date));

    const schoolDays = createSchoolDaysList(ascDates);

    return schoolDays;
}

const checkIfHasClassInThisDate = (date: Date, schedules: FormatedSchedules[], calendar: Calendar) => {
    let has = false;

    if (date > convertStringToDate(calendar.end_date)) return has;

    has = schedules.some(e => e.day === date.getDay());

    if (date.getDay() === 6 && calendar.activity_dates) {
        const isSchoolSaturday = calendar.activity_dates
            .filter(e => {
                if (e.type === 'school_saturday' && e.date === convertDateToString(date))
                    return e;
            })[0];

        if (isSchoolSaturday)
            has = schedules.some(sch => sch.dayName === isSchoolSaturday.reference_day)
    }
    return has;
}

const getDescription = (date: Date, calendar: Calendar) => {
    const formatedDate = convertDateToString(date);
    let description = '';

    description = calendar.activity_dates ?
        calendar.activity_dates
            .filter(e => {
                if (e.type !== 'school_saturday' && e.date === formatedDate)
                    return e;
            }).map(e => e.description)[0] : '';

    return description;
}

const getFormatedSchedules = (schedules: Schedules[]) => {
    const formatedSchedules: FormatedSchedules[] = [];

    schedules.forEach(sch => {
        let day = 1;
        let dayName = '';

        switch (sch.day) {
            case 'segunda':
                day = 1;
                dayName = 'monday';
                break;
            case 'terça':
                day = 2;
                dayName = 'tuesday';
                break;
            case 'quarta':
                day = 3;
                dayName = 'wedsnesday';
                break;
            case 'quinta':
                day = 4;
                dayName = 'thursday';
                break;
            case 'sexta':
                day = 5;
                dayName = 'friday';
                break;
            case 'sabado':
                day = 6;
                dayName = 'saturday';
                break;
        };

        formatedSchedules.push({
            day,
            dayName,
            times: sch.times
        });
    });

    return formatedSchedules;
}

const createDateList = (date: Date, schedules: FormatedSchedules[], calendar: Calendar) => {
    const dayNumber = date.getDay() === 6 ? getSaturdayClassesNumber(date, calendar) : date.getDay();

    const schedule = schedules.find(sch => sch.day === dayNumber);

    let dates: DateProps[] = [];

    if (schedule)
        schedule.times.map(time => {
            dates.push({
                date: convertDateToString(date),
                description: getDescription(date, calendar),
                time,
            });
        });
    else
        dates.push({
            date: convertDateToString(date),
            description: getDescription(date, calendar),
            time: schedules[0].times[1],
        });

    const formatedDates = dates.map(date => {
        const description = date.description === undefined ? '' : date.description;
        return {
            ...date,
            description
        }
    });

    return formatedDates;
}

const setSchoolDay = (list: SchoolDays[], date: DateProps, monthName: string) => {
    const schoolDaysList: SchoolDays[] = list;
    const schoolDay = list.find(e => e.month === monthName);
    let index = 0;
    let includes = false;

    if (schoolDay) {
        schoolDay.schedules.forEach(sch => {
            if (sch.date === date.date && sch.time === date.time) includes = true;
        });

        if (includes) return schoolDaysList;

        index = schoolDaysList.indexOf(schoolDay);
        schoolDay.schedules.push(date);
        schoolDaysList.splice(index, 1);
        schoolDaysList.push(schoolDay);
    } else {
        schoolDaysList.push({ month: monthName, schedules: [date] });
    }

    return schoolDaysList;
}

const createSchoolDaysList = (list: DateProps[]) => {
    const dateList: DateProps[] = [];
    let schoolDays: SchoolDays[] = [];

    for (const i of list)
        if (!dateList.includes(i)) dateList.push(i);

    for (const i of dateList) {
        const month = Number(i.date.split('/')[1]);
        let monthName = '';

        switch (month) {
            case 1:
                monthName = 'Janeiro';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 2:
                monthName = 'Fevereiro';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 3:
                monthName = 'Março';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 4:
                monthName = 'Abril';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 5:
                monthName = 'Maio';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 6:
                monthName = 'Junho';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 7:
                monthName = 'Julho';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 8:
                monthName = 'Agosto';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 9:
                monthName = 'Setembro';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 10:
                monthName = 'Outubro';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 11:
                monthName = 'Novembro';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
            case 12:
                monthName = 'Dezembro';
                schoolDays = setSchoolDay(schoolDays, i, monthName);
                break;
        }
    }

    return schoolDays;
}

const getSaturdayClassesNumber = (date: Date, calendar: Calendar) =>  {
    let day = 0;

    calendar.activity_dates?.forEach(e => {
        if (e.type === "school_saturday" && e.date === convertDateToString(date))
            day = getReferenceDayNumber(e.reference_day);
    });

    return day;
}

const getReferenceDayNumber = (dayName: string) => {
    let day = 0;

    switch (dayName) {
        case 'monday':
            day = 1;
            break;
        case 'tuesday':
            day = 2;
            break;
        case 'wedsnesday':
            day = 3;
            break;
        case 'thursday':
            day = 4;
            break;
        case 'friday':
            day = 5;
            break;
    };

    return day;
}

export default getDates;