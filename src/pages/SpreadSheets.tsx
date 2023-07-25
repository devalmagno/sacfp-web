import { useRef, useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { BiData, BiSpreadsheet, BiPlus, BiTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { BoxButton, Button, Search } from '../ui';

import { routes } from '../services/routes';
import { db } from '../services/firebaseConfig';
import { alphabeticalSort, toCapitalize } from '../utils';
import { useDataContext } from '../contexts';

import { Teacher } from '../types/DataTypes';

import '../styles/SpreadSheets.scss';
import '../styles/ColumnBox.scss';
import { Link, Outlet } from 'react-router-dom';

function SpreadSheets() {
  const [sgd3Info, setSGD3Info] = useState<Teacher[]>([]);
  const [isDataUplouded, setIsDataUplouded] = useState(false);
  const [error, setError] = useState(false);
  const inputElement = useRef<HTMLInputElement | null>(null);
  const { teachers, setTeachers, semester } = useDataContext();
  const [teachersList, setTeachersList] = useState<Teacher[]>(teachers.sort((a, b) => alphabeticalSort(a.name, b.name)));

  const navigate = useNavigate();

  const teachersCollectionRef = collection(db, "teachers");

  const teachersElements = teachersList.map((teacher, index) => (
    <tr key={`${teacher.id}${index}`}>
      <td>{teacher.name}</td>
      <td>{teacher.masp}</td>
      <td className="teacher--buttons">
        <div className="open--data">
          <Link
            to={`${teacher.id}`}
            state={{
              teacher: teacher,
            }}
          // onClick={toggleShowOutlet}
          >
            <BiSpreadsheet className="open--data" fill="#46343B" size={24} />
          </Link>

        </div>
        <div className="delete--teacher" onClick={() => deleteTeacher(teacher.id!)}>
          <BiTrash fill="#46343B" size={24} />
        </div>
      </td>
    </tr>
  ));

  const buttonStyle = {
    maxWidth: 120,
    alignSelf: 'flex-end',
  }

  const handleSearch = (title: string, value: string) => {

    switch (title) {
      case 'Professor':
        handleSearchByTeacher(value);
        break;
      case 'Disciplina':
        handleSearchByDiscipline(value);
        break;
      case 'Curso':
        handleSearchByCourse(value);
        break;
    }
  }

  const handleSearchByTeacher = (value: string) => {
    const searchTeacherList = teachers.filter(teacher => {
      const search = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const name = teacher.name != undefined ? teacher.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") : '';

      return name.includes(search);
    });

    let filteredList: Teacher[] = [];

    searchTeacherList.forEach(elem => {
      if (!filteredList.includes(elem)) filteredList.push(elem);
    })

    setTeachersList(filteredList);
  }

  const handleSearchByDiscipline = (value: string) => {
    const searchTeacherList: Teacher[] = [];

    teachers.forEach(teacher => {
      const search = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      let disciplines: Teacher[] = [];

      teacher.pointsheets?.forEach(sheet => {
        const discipline = sheet.discipline.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        if (discipline.includes(search))
          disciplines.push(teacher);
      });

      searchTeacherList.push(...disciplines);
    });

    let filteredList: Teacher[] = [];

    searchTeacherList.forEach(elem => {
      if (!filteredList.includes(elem)) filteredList.push(elem);
    })

    setTeachersList(filteredList);
  }

  const handleSearchByCourse = (value: string) => {
    const searchTeacherList: Teacher[] = [];

    teachers.forEach(teacher => {
      const search = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      let courses: Teacher[] = [];

      teacher.pointsheets?.forEach(sheet => {
        const course = sheet.course.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        if (course.includes(search))
          courses.push(teacher);
      });

      searchTeacherList.push(...courses);
    });

    let filteredList: Teacher[] = [];

    searchTeacherList.forEach(elem => {
      if (!filteredList.includes(elem)) filteredList.push(elem);
    })

    setTeachersList(filteredList);
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

        Object.keys(teachers[0]).sort().forEach((teacherKey, index) => {
          const keys = ['name', 'masp', 'pointsheets'].sort();

          console.log(teacherKey, keys[index])
          isValidTeacher = teacherKey === keys[index];
        });

        if (isValidTeacher) {
          setSGD3Info([...teachers]);
          uploudSGD3Info(teachers);
        }
        else console.log('Wrong File.');
      }
    }

    fileReader.onerror = error => console.log(error);
  }

  const uploudSGD3Info = async (data: Teacher[]) => {
    const teachers = data.map(info => {
      const pointsheets = info.pointsheets!.map(sheet => {
        return {
          ...sheet,
        };
      });

      return {
        ...info,
        pointsheets
      };
    });

    const filteredTeachers: Teacher[] = [];

    teachers.forEach(e => {
      if (!filteredTeachers.some(teach => teach.name === e.name)) filteredTeachers.push(e);
      else {
        const teacher = filteredTeachers.find((teach, index) => teach.name === e.name);
        const index = filteredTeachers.indexOf(teacher!);
        const sheets = e.pointsheets;

        sheets.forEach(sheet => {
          if (!teacher?.pointsheets?.some(p => p === sheet))
            filteredTeachers[index].pointsheets?.push(sheet);
        });
      }
    });

    for (const teacher of filteredTeachers) {
      if (teacher.pointsheets!.length !== 0)
        try {
          await addDoc(teachersCollectionRef, teacher);
        } catch (e) {
          setError(true);
          console.log(e);
        }
    }

    if (!error)
      setIsDataUplouded(true);

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
      title: routes[5].title,
      icon: <BiPlus fill="#fff" size={48} />,
      background: '#333A56',
      color: '#fff',
      path: `../${routes[5].path}`
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
      title={title!}
      func={button.func}
      path={button.path}
      disabled={teachers.length > 0 && title === 'Inserir dados' || teachers.length === 0 && title === 'Folhas de ponto'}
    />
  });

  const deleteTeacher = async (id: string) => {
    const answer = window.confirm(`Tem certeza que deseja remover o usuário?`);

    if (!answer) return;

    const teacherDoc = doc(db, "teachers", id);
    await deleteDoc(teacherDoc);

    const teacher = teachers.find(e => e.id === id);

    const teacherList = teachers;
    const index = teacherList.indexOf(teacher!);
    teacherList.splice(index, 1);
    setTeachers(teacherList);
    setTeachersList(teachers.sort((a, b) => alphabeticalSort(a.name, b.name)));
  }

  useEffect(() => {
    document.title = 'SGCFP - Dados';

    const formatedTeachers = teachers.map(teacher => {
      const pointsheets = teacher.pointsheets!.map(e => ({
        period: e.period,
        workload: e.workload,
        course: e.course,
        discipline: e.discipline,
        schedules: e.schedules,
      }));

      return {
        ...teacher,
        pointsheets,
      }
    });
  }, []);

  const reloadPage = () => {
    navigate('/');
    window.location.reload();
  }

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
          onClick={reloadPage}
        />
      </div>

      {teachers.length > 0 && (
        <>
          <div className="search--box">
            <Search
              handleSearch={handleSearch}
            />
          </div>

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
        </>
      )}
    </section >
  )
}

export default SpreadSheets