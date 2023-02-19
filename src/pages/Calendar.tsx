import { useEffect, useState } from "react";
import { BiEdit, BiSave, BiX, BiCalendar } from 'react-icons/bi';

import { CalendarContainer } from '../components';
import { Button, InputDate } from '../ui';

import { useDataContext } from "../contexts"

import '../styles/Calendar.scss';
import { FormDate } from "../components";
import { db } from "../services/firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";
import { Calendar as CalendarType } from "../types/DataTypes";

function Calendar() {
  const { semester, calendar, setCalendar } = useDataContext();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [isDisabled, setIsDisabled] = useState(true);

  const calendarCollectionRef = collection(db, "semesters")

  const semesterText = `${semester.split('/')[0].split('0').toString().substring(1, 2)}º Semestre de ${semester.split('/')[1]}`;

  const showCalendarContainer = calendar.activity_dates && calendar.activity_dates.length > 0;

  const buttonStyle = {
    columnGap: '8px',
  }

  const toggleIsDisabled = () => {
    event?.preventDefault();
    setIsDisabled(_prevState => !_prevState);
  }


  const createNewCalendar = async () => {
    const { id } = await addDoc(calendarCollectionRef, {
      semester,
      startDate,
      endDate
    });

    setCalendar({
      id,
      semester,
      start_date: startDate,
      end_date: endDate,
    });
  }

  const updateSemesterStartAndEndDate = async () => {
    event?.preventDefault();

    setCalendar(_prevState => {
      const calendar: CalendarType = {
        ..._prevState,
        start_date: startDate,
        end_date: endDate,
      }

      return calendar;
    })

    if (!calendar.id) return;
    const calendarDoc = doc(db, "semesters", calendar.id);

    await updateDoc(calendarDoc, calendar);
    toggleIsDisabled();
  }

  useEffect(() => {
    if (calendar.start_date) {
      setStartDate(calendar.start_date);
      setEndDate(calendar.end_date);
    }
  }, []);

  if (!calendar)
    return (
      <section>
        <Button
          title={`criar novo calendário para o semestre ${semester}`}
          icon={<BiCalendar fill='#fff' size={20} />}
          style={buttonStyle}
          onClick={createNewCalendar}
        />
      </section>
    );

  return (
    <section>
      <div className="calendar--container">
        <div className="form--container">
          <h4>{semesterText}</h4>

          <form className="semester--info" onSubmit={updateSemesterStartAndEndDate}>
            <InputDate
              label="Ínicio"
              value={startDate}
              setValue={setStartDate}
              isDisabled={isDisabled}
              width={144}
            />
            <InputDate
              label="término"
              value={endDate}
              setValue={setEndDate}
              isDisabled={isDisabled}
              width={144}
            />
            {isDisabled ? (
              <Button
                icon={<BiEdit fill="#fff" size={20} />}
                onClick={toggleIsDisabled}
                tooltip="alterar"
              />
            ) : (
              <>
                <Button
                  icon={<BiSave fill="#fff" size={20} />}
                  submit={true}
                  tooltip="salvar"
                  isDisabled={startDate.length == 0 || endDate.length == 0}
                />
                <Button
                  icon={<BiX fill="#fff" size={20} />}
                  onClick={toggleIsDisabled}
                  tooltip="cancelar"
                />
              </>
            )}
          </form>
          <hr />
          {startDate !== '' && endDate !== '' ? (
            <FormDate
              calendar={calendar}
              setCalendar={setCalendar}
              semester={semester}
            />
          ) : (
            <strong>Adicione a data de ínicio e término para ver mais opções.</strong>
          )}


        </div>

        {showCalendarContainer ? (
          <CalendarContainer
            calendar={calendar}
            key={calendar.activity_dates?.length}
          />

        ) :
          <div className="calendar--display"></div>}
      </div>
    </section>
  )
}

export default Calendar