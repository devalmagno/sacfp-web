interface SchoolDaysProps {
    date: string;
    time: number;
}

interface ScheduleList {
    month: string;
    schedules: SchoolDaysProps[];
}

export const getSchoolDaysList = (list: SchoolDaysProps[]) => {
    const dateList: SchoolDaysProps[] = [];
    let scheduleList: ScheduleList[] = [];

    for (const i of list)
        if (!dateList.includes(i)) dateList.push(i);

    for (const i of dateList) {
        const month = Number(i.date.split('/')[1]);
        let monthName = '';

        switch (month) {
            case 1:
                monthName = 'Janeiro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 2:
                monthName = 'Fevereiro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 3:
                monthName = 'Março';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 4:
                monthName = 'Abril';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 5:
                monthName = 'Maio';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 6:
                monthName = 'Junho';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 7:
                monthName = 'Julho';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 8:
                monthName = 'Agosto';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 9:
                monthName = 'Setembro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 10:
                monthName = 'Outubro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 11:
                monthName = 'Novembro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
            case 12:
                monthName = 'Dezembro';
                scheduleList = handlerScheduleList(scheduleList, monthName, i);
                break;
        }
    }

    return scheduleList;
}

const handlerScheduleList = (
    scheduleList: ScheduleList[],
    monthName: string,
    item: SchoolDaysProps
) => {
    const schedules: ScheduleList[] = scheduleList;

    if (schedules.some(e => e.month === monthName)) {
        const index = scheduleList.findIndex(e => e.month === monthName);
        schedules[index].schedules.push(item);
    } else {
        schedules.push({
            month: monthName,
            schedules: [item]
        });
    }

    return schedules;
}