import { getMonthName } from '../utils';
import { Calendar, Activity_dates } from '../types/DataTypes';
import { useEffect, useState } from 'react';

import '../styles/CalendarContainer.scss';

type Props = {
  calendar: Calendar;
}


function CalendarContainer(props: Props) {
  const [selectedDate, setSelectedDate] = useState<Activity_dates>({
    date: '',
    description: '',
    reference_day: '',
    type: ''
  });

  const months: string[] = [];

  props.calendar.activity_dates?.forEach(elem => {
    const month = elem.date.split('/')[1];

    if (!months.includes(month)) months.push(month);
  });

  const monthsElements = months.map(month => {
    const monthName = getMonthName(month);

    const monthDaysElements = props.calendar.activity_dates?.filter(elem => {
      const dateMonth = elem.date.split('/')[1];

      if (Number(dateMonth) === Number(month)) return elem;
    }).map(elem => {
      const dayNumber = elem.date.split('/')[0];

      return (
        <div 
          className={`date--box ${elem.type}`} 
          key={elem.date}
          onClick={() => setSelectedDate(elem)}
        >
          <span>{dayNumber}</span>
        </div>
      );
    });

    return (
      <div className="month--container" key={month}>
        <span>{monthName}</span>
        <div className="date--container">
          {monthDaysElements}
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (props.calendar.activity_dates)
      setSelectedDate(props.calendar.activity_dates[0]);
  }, []);

  return (
    <div className="calendar--display">
      <h4>Calendário Letivo</h4>
      {monthsElements}

      <div className="date-info--container">
        <div className="info">
          <strong>Informação sobre o dia {selectedDate.date}</strong>
          <span>{selectedDate.description}</span>
          <span>{selectedDate.reference_day}</span>
        </div>
      </div>

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