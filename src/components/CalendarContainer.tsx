import { BiTrash } from 'react-icons/bi';

import { arrayRange, convertDateToString, getMonthName } from '../utils';
import { Calendar, Activity_dates } from '../types/DataTypes';
import { useEffect, useState } from 'react';

import '../styles/CalendarContainer.scss';
import { useDataContext } from '../contexts';
import { DateInfo } from '../ui';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../services/firebaseConfig';

type Props = {
  calendar: Calendar;
}

type semesterMonths = {
  monthName: string;
  dates: Activity_dates[];
}

type calendarList = {
  month: string,
  dateList: Date[];
}

type Date = {
  date: string;
  description: string;
  reference_day: string;
  type: string;
  isSelected: boolean;
}

function CalendarContainer(props: Props) {
  const { semester, setCalendar } = useDataContext();

  const [calendarList, setCalendarList] = useState<calendarList[]>([]);

  const [selectedDate, setSelectedDate] = useState<Activity_dates | null>(null);

  const monthElements = calendarList.map(elem => {
    const dateElements = elem.dateList.filter(e => e.isSelected)
      .map(e => {
        const dayNumber = e.date.split('/')[0];

        return (
          <div
            className={`date--box ${e.type}`}
            key={e.date}
            onClick={() => setSelectedDate(e)}
          >
            <span>{dayNumber}</span>
          </div>
        );
      });

    if (dateElements.length === 0) return <div key={elem.month}></div>
    return (
      <div className="month--container" key={elem.month}>
        <span>{elem.month}</span>
        <div className="date--container">
          {dateElements}
        </div>
      </div>
    );
  });

  const getCalendarList = () => {
    const calendarList = arrayRange({
      start: 1,
      step: 1,
      stop: 12
    }).map((monthNumber) => {
      const month = getMonthName(monthNumber.toString());
      const year = Number(semester.split('/')[1]);
      const numberOfDays = new Date(year, monthNumber, 0).getDate();
      const dateList: Date[] = arrayRange({
        step: 1,
        start: 1,
        stop: numberOfDays
      }).map(date => {
        const formatedDate = convertDateToString(new Date(year, monthNumber - 1, date));
        let description = '';
        let isSelected = false;
        let reference_day = '';
        let type = '';

        if (props.calendar.activity_dates) {
          const activityDate = props.calendar.activity_dates.find(e => e.date === formatedDate);

          if (activityDate) {
            description = activityDate.description;
            isSelected = true;
            reference_day = activityDate.reference_day;
            type = activityDate.type
          }
        }

        return {
          date: formatedDate,
          description,
          isSelected,
          reference_day,
          type
        }
      });

      return {
        month,
        dateList,
      }
    });

    setCalendarList(calendarList);
  }

  const removeDate = async () => {
    const activityDateList = props.calendar.activity_dates.slice();
    let index = -1;
    activityDateList.forEach((e, i) => {
      if (e.date === selectedDate!.date) index = i;
    });
    activityDateList.splice(index, 1);

    console.log(index, selectedDate, activityDateList);

    const calendar: Calendar = {
      ...props.calendar,
      activity_dates: activityDateList
    };

    const calendarDoc = doc(db, "semesters", calendar.id);
    await updateDoc(calendarDoc, calendar);

    setCalendar(calendar);
    setSelectedDate(null);
  }

  useEffect(() => {
    getCalendarList();
  }, []);

  useEffect(() => {
    getCalendarList();
  }, [props.calendar])

  return (
    <div className="calendar--display">
      <h4>Calendário Letivo</h4>
      {monthElements}
      {selectedDate && (
        <DateInfo
          date={selectedDate}
          func={removeDate}
        />
      )}
      <div className="color--info">
        <div className="color--container">
          <div className="color--box yellow"></div>
          <span>Recesso ou feriado</span>
        </div>

        <div className="color--container">
          <div className="color--box red"></div>
          <span>Sábado letivo referente a feriados</span>
        </div>

        <div className="color--container">
          <div className="color--box purple"></div>
          <span>FEPEG</span>
        </div>

        <div className="color--container">
          <div className="color--box white"></div>
          <span>Outros</span>
        </div>
      </div>
    </div>
  )
}

export default CalendarContainer