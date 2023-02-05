import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Input, Button, InputDate } from '../ui';

import dateTypeList, { DateTypeInterface } from '../assets/dateTypesList';

import '../styles/FormDate.scss';
import { isValidDate, toCapitalize } from '../utils';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useDataContext } from '../contexts';
import { Calendar } from '../types/DataTypes';

type Props = {
  calendar: Calendar;
  setCalendar: Dispatch<SetStateAction<Calendar>>;
  semester: string;
}

function FormDate({ calendar, setCalendar, semester }: Props) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [referenceDay, setReferenceDay] = useState('');

  const [selectedDateType, setSelectedDateType] = useState<DateTypeInterface>({
    title: '',
    type: ''
  });

  const referenceDayList = [
    { day: 'monday', title: 'segunda' },
    { day: 'tuesday', title: 'terça' },
    { day: 'wednesday', title: 'quarta' },
    { day: 'thursday', title: 'quinta' },
    { day: 'friday', title: 'sexta' },
  ];

  const buttonStyle = {
    width: '128px',
    alignSelf: 'flex-end',
  }

  const dateTypeElements = dateTypeList.map(date => {
    const isSelected = date === selectedDateType;
    const className = isSelected ? "clickable-box selected" :
      "clickable-box";

    const title = toCapitalize(date.title);

    return (
      <div
        className={className}
        onClick={() => setSelectedDateType(date)}
        key={date.type}
      >
        {title}
      </div>
    );
  });

  const referenceDayElements = referenceDayList.map(elem => {
    const isSelected = elem.day === referenceDay;
    const className = isSelected ? "clickable-box selected" :
      "clickable-box";

    const title = toCapitalize(elem.title);

    return (
      <div
        className={className}
        onClick={() => setReferenceDay(elem.day)}
        key={elem.day}
      >
        {title}
      </div>
    );
  });

  const addNewDateToCalendar = async () => {
    event?.preventDefault();
    if (!isValidDate(date, semester)) return;

    const calendarDoc = doc(db, "semesters", calendar.id);

    const updatedCalendar = calendar;
    updatedCalendar.activity_dates?.push({
      date,
      description,
      reference_day: referenceDay,
      type: selectedDateType.type,
    });

    setCalendar(updatedCalendar);
    await updateDoc(calendarDoc, updatedCalendar)
    setDescription('');
    setDate('');
    setReferenceDay('');
    setSelectedDateType({
      title: '',
      type: ''
    });
  }

  useEffect(() => {
    if (selectedDateType.type !== 'other')
      setDescription(selectedDateType.title.toUpperCase());
    else setDescription('');
  }, [selectedDateType]);

  return (
    <div className="container--form-date">
      <div className="type--selector">
        <h4>Adicionar data</h4>
        <form className="form--date" onSubmit={addNewDateToCalendar}>
          <strong>Tipo</strong>
          <div className="container--date-types-list">
            {dateTypeElements}
          </div>

          {selectedDateType.type === 'school_saturday' && (
            <>
              <strong>Dia de referência</strong>
              <div className="container--date-types-list" style={{ marginBottom: '8px' }}>
                {referenceDayElements}
              </div>
            </>
          )}

          {selectedDateType.type !== '' && (
            <>
              <Input
                label='Descrição'
                value={description}
                setValue={setDescription}
                isDisabled={false}
              />
              <InputDate
                label='Data'
                value={date}
                setValue={setDate}
                isDisabled={false}
              />
            </>
          )}

          <Button
            title='Adicionar'
            style={buttonStyle}
            submit={true}
            isDisabled={selectedDateType.type === '' ||
              date === '' ||
              selectedDateType.type === 'other' &&
              description === '' ||
              selectedDateType.type === 'school_saturday' &&
              referenceDay === ''
            }
          />
        </form>
      </div>
    </div>
  )
}

export default FormDate