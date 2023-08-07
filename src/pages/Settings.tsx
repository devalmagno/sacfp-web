import { useEffect, useState } from 'react';
import { Button, Details, Input, InputSemester } from '../ui';
import { useAuthContext, useDataContext } from '../contexts';

import '../styles/Settings.scss';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@firebase/firestore';
import { db } from '../services/firebaseConfig';
import CardEmail from '../ui/CardEmail';
import CardInput from '../ui/CardInput';
import { User } from '../types/DataTypes';
import { SelectCurrentSemester } from '../components';

type selectedSemester = {
  semester: number;
  year: number;
}

function Settings() {
  const { semester, setSemester, config, setConfig, calendar, setCalendarList, calendarList } = useDataContext();

  const [departamentName, setDepartamentName] = useState(config ? config.departament.toUpperCase() : '');
  const [acronym, setAcronym] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<selectedSemester>({
    semester: 1,
    year: new Date().getFullYear(),
  });

  const { userList: users, setUserList: setUsers } = useAuthContext();

  const calendarCollectionRef = collection(db, "semesters");
  const usersCollectionRef = collection(db, "users");
  const configCollectionRef = collection(db, "config");

  const showConfigSaveNameButton =
    config ? config.departament.toUpperCase() !== departamentName &&
      departamentName !== '' : departamentName.length > 3;

  const buttonStyle = {
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    width: '128px'
  }

  const semesterElements = [1, 2].map(e => {
    const isSelected = e === selectedSemester.semester;

    return (
      <div
        className={isSelected ?
          "box select" :
          "box"
        }
        key={e}
        onClick={() => { setSelectedSemester({ ...selectedSemester, semester: e }) }}
      >
        {e}
      </div>
    )
  });

  const yearElements = [
    new Date().getFullYear() - 1,
    new Date().getFullYear(),
    new Date().getFullYear() + 1
  ]
    .map(e => {
      const isSelected = e === selectedSemester.year;

      return (
        <div
          className={isSelected ?
            "box select" :
            "box"
          }
          key={e}
          onClick={() => { setSelectedSemester({ ...selectedSemester, year: e }) }}
        >
          {e}
        </div>
      )
    });

  const deleteUser = async (id: string) => {
    const answer = window.confirm(`Tem certeza que deseja remover o usuário?`);
    if (!answer) return;
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);

    const user = users.find(e => e.id === id);

    const userList = users;
    const index = userList.indexOf(user!);
    userList.splice(index, 1);
    setUsers([...userList]);
  }

  const usersElements = users.map(e => (
    <CardEmail
      key={e.id}
      id={e.id!}
      email={e.email}
      name={e.name}
      userType={e.type}
      deleteUser={deleteUser}
    />
  ));

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

  const addNewConfig = async () => {
    const { id } = await addDoc(configCollectionRef, {
      departament: departamentName,
    });

    setConfig({ id, departament: departamentName, semester });
  }

  const addNewSemester = async () => {
    const formatedSemester = `0${selectedSemester.semester}/${selectedSemester.year}`;

    if (calendarList.some(e => e.semester === formatedSemester)) return;


    const { id } = await addDoc(calendarCollectionRef, {
      end_date: '',
      start_date: '',
      activity_dates: [],
      semester: formatedSemester,
      acronym,
    });

    const newCalendar = {
      id,
      end_date: '',
      start_date: '',
      activity_dates: [],
      semester: formatedSemester,
      acronym: '',
    };

    const newCalendarList = [...calendarList, newCalendar];

    setCalendarList(newCalendarList);
    setSemester(formatedSemester);
  }

  const createNewCalendar = async () => {
    event!.preventDefault();

    const { id } = await addDoc(calendarCollectionRef, {
      end_date: calendar.end_date,
      start_date: calendar.start_date,
      activity_dates: calendar.activity_dates,
      semester,
      acronym,
    });

    const newCalendar = {
      id,
      end_date: calendar.end_date,
      start_date: calendar.start_date,
      activity_dates: calendar.activity_dates,
      semester,
      acronym,
    };

    const newCalendarList = [...calendarList, newCalendar];

    setCalendarList(newCalendarList);

    setAcronym('');
  }

  useEffect(() => {
    document.title = 'SGCFP - Configurações'
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const userList = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as User));
      setUsers(userList);
    }

    getUsers();
  }, []);

  return (
    <section>
      <div className="settings--container column">
        <h4>Configurações</h4>

        <div className="settings--content">
          <Details title='Sobre o departamento'>
            <Input
              value={departamentName}
              setValue={setDepartamentName}
              label='Departamento'
              isDisabled={false}
            />
            {showConfigSaveNameButton ?
              config ?
                <Button
                  title='Salvar'
                  style={buttonStyle}
                  onClick={updateConfig}
                />
                :
                <Button
                  title='Adicionar'
                  style={buttonStyle}
                  onClick={addNewConfig}
                /> : ''
            }
          </Details>

          <Details title='Semestre letivo' isOpen={true}>
            <div className="semester column">
              {semester !== '' && (
                <div className="current-semester">
                  <strong className='subtext'>Atual</strong>
                  <span className='subtext'>{semester}{calendar?.acronym}</span>
                </div>
              )}

              <div className="add-semester">
                <strong className='subtext'>Adicionar Semestre</strong>
                <span className='subtext'>Selecione o semestre</span>
                <div className="box--container">
                  {semesterElements}
                </div>
                <span className='subtext'>Selecione o ano</span>
                <div className="box--container">
                  {yearElements}
                </div>

                <Button
                  title='Adicionar novo semestre'
                  onClick={addNewSemester}
                />
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
          </Details>

          <Details title="Semestre letivo padrão">
                <SelectCurrentSemester />
          </Details>

          <Details title='Usuários'>
            <div className="user--settings column">
              <strong className='no-select'>Usuários</strong>

              <div className="users-input column">
                <CardInput
                  users={users}
                  setUsers={setUsers}
                />
              </div>

              <div className="users--container column">
                {usersElements}
              </div>
            </div>
          </Details>
        </div>
      </div>
    </section>
  )
}

export default Settings