import { useRef, useState } from 'react';
import { addDoc, collection } from '@firebase/firestore';
import { BiData, BiSpreadsheet } from 'react-icons/bi';

import { BoxButton, Button, Search } from '../ui';

import { routes } from '../services/routes';
import { db } from '../services/firebaseConfig';
import { alphabeticalSort, toCapitalize } from '../utils';
import { useSemesterContext, useDataContext } from '../contexts';

import { Teacher } from '../types/DataTypes';

import '../styles/SpreadSheets.scss';
import '../styles/ColumnBox.scss';
import { Link, Outlet } from 'react-router-dom';

function SpreadSheets() {
  const [sgd3Info, setSGD3Info] = useState<Teacher[]>([]);
  const [isDataUplouded, setIsDataUplouded] = useState(false);
  const inputElement = useRef<HTMLInputElement | null>(null);
  const semesterContext = useSemesterContext();
  const { teachers, setTeachers } = useDataContext();
  const [teachersList, setTeachersList] = useState<Teacher[]>(teachers.sort((a, b) => alphabeticalSort(a.name, b.name)));
  // const [showOutlet, setShowOutlet] = useState(false);

  const teachersCollectionRef = collection(db, "teachers");


  // const toggleShowOutlet = () => {
  //   setShowOutlet(_prevState => !_prevState);
  // }

  const teachersElements = teachersList.map(teacher => (
    <tr key={teacher.id}>
      <td>{teacher.name}</td>
      <td>{teacher.masp}</td>
      <td>
        <Link
          to={`${teacher.id}`}
          state={{
            teacher: teacher,
          }}
        // onClick={toggleShowOutlet}
        >
          <BiSpreadsheet fill="#46343B" size={24} />
        </Link>
      </td>
    </tr>
  ));

  const buttonStyle = {
    maxWidth: 120,
    alignSelf: 'flex-end',
  }

  const handleSearch = (value: string) => {
    const searchTeacherList = teachers.filter(teacher => {
      const search = value.toLowerCase();
      const name = teacher.name != undefined ? teacher.name.toLowerCase() : '';

      return name.includes(search);
    });

    setTeachersList(searchTeacherList);
  }

  const clickInput = () => {
    inputElement.current?.click();
  }

  const handleChange = () => {
    const fileReader = new FileReader();
    fileReader.readAsText(inputElement.current!.files![0], "UTF-8");

    fileReader.onload = e => {
      if (!e.target) return;

      const result = e.target.result;

      if (typeof (result) === 'string') {
        const teachers = JSON.parse(result);
        let isValidTeacher = false;

        Object.keys(teachers[0]).forEach((teacherKey, index) => {
          const keys = ['name', 'masp', 'pointsheets'];

          console.log(teacherKey, keys[index])
          isValidTeacher = teacherKey === keys[index];
        });

        if (isValidTeacher) {
          setSGD3Info(teachers);
          uploudSGD3Info();
        }
        else console.log('Wrong File.');
      }
    }

    fileReader.onerror = error => console.log(error);
  }

  const uploudSGD3Info = async () => {
    const teachers = sgd3Info.map(info => {
      const pointsheets = info.pointsheets.map(sheet => {
        return {
          ...sheet,
          schedules: [],
          semester: semesterContext.semester,
        };
      });

      return {
        ...info,
        pointsheets
      };
    });

    for (const teacher of teachers) {
      if (teacher.pointsheets.length !== 0)
        try {
          await addDoc(teachersCollectionRef, teacher);
          setIsDataUplouded(true);
        } catch (e) {
          console.log(e);
        }
    }
  }

  const boxButtons = [
    {
      title: 'inserir dados',
      icon: <BiData fill="#fff" size={48} />,
      background: '#333A56',
      color: '#fff',
      func: clickInput,
    },
    {
      title: routes[2].title,
      icon: routes[2].icon,
      background: '#fff',
      color: '#333A56',
      path: `../${routes[2].path}`,
    }
  ];

  const boxButtonsElements = boxButtons.map(button => {
    const title = toCapitalize(button.title);

    return <BoxButton
      key={title}
      background={button.background}
      color={button.color}
      icon={button.icon}
      title={title}
      func={button.func}
      path={button.path}
    />
  });

  return (
    <section>
      <div className="container">
        {boxButtonsElements}
        <input
          type="file"
          name="file"
          id="file"
          accept='.json'
          ref={inputElement}
          onChange={handleChange}
        />
      </div>

      <div className={isDataUplouded ? 'uploud-status' : 'hidden'}>
        <strong>Dados inseridos com sucesso</strong>
        <div className="process"></div>
        <Button
          title="Atualizar"
          style={buttonStyle}
        />
      </div>

      <Search handleSearch={handleSearch} />

      <table className='data-table'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Masp</th>
            <th>Ficha</th>
          </tr>
        </thead>
        <tbody>
          {teachersElements}
        </tbody>
      </table>
    </section >
  )
}

export default SpreadSheets