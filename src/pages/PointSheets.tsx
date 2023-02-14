import { BiEdit, BiSpreadsheet } from 'react-icons/bi';

import { Button, Search } from "../ui";

import '../styles/PointSheets.scss';
import { useDataContext } from '../contexts';
import { TeacherPointSheet } from '../types/DataTypes';
import { alphabeticalSort } from '../utils';
import { useEffect, useState } from 'react';
import { DocViewer } from '../components';

function PointSheets() {
  const { teachers, calendar } = useDataContext();
  const [disciplineList, setDisciplineList] = useState<TeacherPointSheet[]>([]);
  const [filteredDisciplineList, setFilteredDisciplineList] = useState<TeacherPointSheet[]>([]);
  const [currentPointsheet, setCurrentPointsheet] = useState<TeacherPointSheet | undefined>(undefined);

  const buttonStyle = {
    background: "#fff",
  }

  const disciplineElements = filteredDisciplineList
    .sort((a, b) => alphabeticalSort(a.sheet.discipline, b.sheet.discipline))
    .map((elem, index) => {
      const schedules = elem.sheet.schedules || [{ day: '', times: [''] }];
      const scheduleList = schedules.map(sch => {
        if (sch.day === '') return;
        const { day, times } = sch;
        const formatedTimes = times.map(time => `${time}º`);

        const formatedSchedule = `${day.toUpperCase().substring(0, 3)}: ${formatedTimes} `;
        return formatedSchedule.substring(0, formatedSchedule.length);
      }).toString();

      return (
        <div
          className="sheet--box"
          key={`${elem.id}${elem.sheet.discipline}${index}`}
        >
          <div className="sheet--info">
            <strong>{elem.sheet.discipline}</strong>
            <span>{elem.sheet.course}</span>
            <span>{elem.name}</span>
            <span>{scheduleList}</span>
          </div>

          <div className="sheet-actions">
            {scheduleList !== '' && (
              <div onClick={() => setCurrentPointsheet(elem)}>
                <Button
                  icon={<BiSpreadsheet fill="#333A56" size={16} />}
                  style={buttonStyle}
                />
              </div>
            )}
            <Button
              icon={<BiEdit fill="#333A56" size={16} />}
              style={buttonStyle}
            />
          </div>
        </div>
      );
    });

  const handleSearch = (value: string) => {
    const searchDisciplineList = disciplineList.filter(elem => {
      const search = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const name = elem.name != undefined ? elem.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") : '';

      return name.includes(search);
    });

    setFilteredDisciplineList(searchDisciplineList);
  }

  useEffect(() => {
    const getDisciplineList = () => {
      const disciplineArray: TeacherPointSheet[] = [];

      teachers.forEach(teacher => {
        if (!teacher.pointsheets) return;

        teacher.pointsheets
          .forEach(sheet => {
            disciplineArray.push(
              {
                id: teacher.id,
                masp: teacher.masp,
                name: teacher.name,
                sheet,
              }
            );
          });
      });

      setDisciplineList(disciplineArray);
      setFilteredDisciplineList(disciplineArray)
    }

    getDisciplineList();
  }, []);

  return (
    <div className="pointsheets--container">
      <div className="pointsheet--data">
        <div className="pointsheet--search">
          <Search
            handleSearch={handleSearch}
            title='professor'
            style={{
              // background: '#fff',
              height: 52,
              marginBottom: 24,
            }}
          />
        </div>
        <div className="pointsheet--inner-content">
          {disciplineList.length === 0 ? (
            <div><strong>Carregando....</strong></div>
          ) : disciplineElements}
        </div>
      </div>

      <div className="pointsheet--render">
        {currentPointsheet && (
          <DocViewer
            pointsheet={currentPointsheet}
            calendar={calendar}
          />
        )}
      </div>
    </div>
  );
}

export default PointSheets;