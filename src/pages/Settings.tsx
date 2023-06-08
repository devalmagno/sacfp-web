import { useEffect, useState } from 'react';
import { Button, Input, InputSemester } from '../ui';
import { useDataContext } from '../contexts';

import '../styles/Settings.scss';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@firebase/firestore';
import { db } from '../services/firebaseConfig';
import CardEmail from '../ui/CardEmail';
import CardInput from '../ui/CardInput';
import { User } from '../types/DataTypes';

function Settings() {
  const { semester, config, setConfig, calendar, setCalendarList } = useDataContext();

  const [departamentName, setDepartamentName] = useState(config.departament.toUpperCase());
  const [newSemester, setNewSemester] = useState('');
  const [acronym, setAcronym] = useState('');

  const [users, setUsers] = useState<User[]>([]);

  const calendarCollectionRef = collection(db, "semesters");
  const usersCollectionRef = collection(db, "users");

  const showConfigSaveNameButton =
    config.departament.toUpperCase() !== departamentName &&
    departamentName !== '';

  const buttonStyle = {
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    width: '128px'
  }

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
              <span className='subtext'>{semester}{calendar?.acronym}</span>
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
        </div>
      </div>
    </section>
  )
}

export default Settings