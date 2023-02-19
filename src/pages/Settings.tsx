import { useState } from 'react';
import { Button, Input, InputSemester } from '../ui';
import { useDataContext } from '../contexts';

import '../styles/Settings.scss';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { db } from '../services/firebaseConfig';

function Settings() {
  const { semester, config, setConfig, calendar, setCalendarList } = useDataContext();

  const [departamentName, setDepartamentName] = useState(config.departament.toUpperCase());
  const [newSemester, setNewSemester] = useState('');
  const [acronym, setAcronym] = useState('');

  const calendarCollectionRef = collection(db, "semesters");

  const showConfigSaveNameButton =
    config.departament.toUpperCase() !== departamentName &&
    departamentName !== '';

  const buttonStyle = {
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    width: '128px'
  }

  const updateConfig = async () => {
    const configDoc = doc(db, "config", config.id);

    await updateDoc(configDoc, {
      ...config,
      departament: departamentName
    });

    setConfig(prevState => ({
      ...prevState,
      departament: departamentName
    }));
  }

  const createNewCalendar = async () => {
    event!.preventDefault();

    const { id } = await addDoc(calendarCollectionRef, {
      end_date: calendar.end_date,
      start_date: calendar.start_date,
      activity_dates: [],
      semester,
      acronym,
    });

    setCalendarList(prevState => [
      ...prevState,
      {
        ...calendar,
        acronym,
        activity_dates: [],
        semester,
        id
      }
    ]);
  }

  return (
    <section>
      <div className="settings--container column">
        <h4>Configurações</h4>

        <div className="column">
          <strong>Sobre o departamento</strong>
          <Input
            value={departamentName}
            setValue={setDepartamentName}
            label='Departamento'
            isDisabled={false}
          />
          {showConfigSaveNameButton && (
            <Button
              title='Salvar'
              style={buttonStyle}
              onClick={updateConfig}
            />
          )}
        </div>

        <div className="semester column">
          <strong>Semestre letivo</strong>

          <div className="current-semester">
            <strong className='subtext'>Atual</strong>
            <span className='subtext'>{semester}{calendar.acronym}</span>
          </div>

          <form className="column" onSubmit={createNewCalendar}>
            <strong className='subtext'>Adicionar novo calendário</strong>
            <Input
              label='Sigla'
              value={acronym}
              setValue={setAcronym}
              isDisabled={false}
              maxLength={3}
            />
            <Button
              title='Adicionar'
              style={buttonStyle}
              submit={true}
            />
          </form>
        </div>
      </div>
    </section>
  )
}

export default Settings