import { Calendar } from "../types/DataTypes";

interface Props {
    schoolDays: SchoolDays[];
    calendar: Calendar;
}

interface SchoolDays {
    date: string;
    time: number;
    description?: string;
}

interface ScheduleList {
    month: string;
    schedules: SchoolDays[];
}

export const getSchoolDaysList = ({ calendar, schoolDays: list }: Props) => {
    const dateList: SchoolDays[] = [];
    let scheduleList: ScheduleList[] = [];

    for (const i of list)
        if (!dateList.includes(i)) dateList.push(i);

    for (const i of dateList) {
        const month = Number(i.date.split('/')[1]);
        let monthName = '';

        switch (month) {
            case 1:
                monthName = 'Janeiro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 2:
                monthName = 'Fevereiro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 3:
                monthName = 'Março';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 4:
                monthName = 'Abril';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 5:
                monthName = 'Maio';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 6:
                monthName = 'Junho';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 7:
                monthName = 'Julho';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 8:
                monthName = 'Agosto';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 9:
                monthName = 'Setembro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 10:
                monthName = 'Outubro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 11:
                monthName = 'Novembro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
            case 12:
                monthName = 'Dezembro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i, calendar);
                break;
        }
    }

    return scheduleList;
}

const handlerScheduleList = (
    scheduleList: ScheduleList[],
    monthName: string,
    item: SchoolDays,
    calendar: Calendar
) => {
    const schedules: ScheduleList[] = scheduleList;
    const description: string | undefined = 
        calendar.activity_dates.find(e => {
        if (e.date === item.date) return e;
    })?.description;

    const itemWithDescription = {
        ...item,
        description: description ? description : '',
    }

    if (schedules.some(e => e.month === monthName)) {
        const index = scheduleList.findIndex(e => e.month === monthName);
        schedules[index].schedules.push(itemWithDescription);
    } else {
        schedules.push({
            month: monthName,
            schedules: [itemWithDescription]
        });
    }

    return schedules;
}