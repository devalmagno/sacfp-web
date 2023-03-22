import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit, BiPlusCircle, BiSave, BiXCircle } from 'react-icons/bi';

import { Button, Input, SavedPopUp } from '../ui';

import { Pointsheet, Teacher as TeacherType } from '../types/DataTypes';

import '../styles/Teacher.scss';
import { SheetRow, AddSheetRow, TutoringSheetRow } from '../components';
import { toCapitalize } from '../utils';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useDataContext } from '../contexts';

type RouteProps = {
    teacher: TeacherType;
}

function Teacher() {
    const route = useLocation();
    const { teacher: teacherProp }: RouteProps = route.state;

    const { setTeachers, calendar, courseList } = useDataContext();

    const [teacher, setTeacher] = useState(teacherProp);
    const [name, setName] = useState(teacher.name);
    const [masp, setMasp] = useState(teacher.masp);

    const [tutoringSheet, setTutoringSheet] = useState<Pointsheet | null>(null);

    const [isDisabled, setIsDisabled] = useState(true);
    const [addDiscipline, setAddDiscipline] = useState(false);

    const [isAddingTutoring, setIsAddingTutoring] = useState(false);
    const [currentCourse, setCurrentCourse] = useState('');

    const [showSucessPopUp, setShowSucessPopUp] = useState(false);

    const semester = calendar.acronym ? `${calendar.semester}${calendar.acronym}` : calendar.semester;

    const toggleDisabled = () => {
        event?.preventDefault();
        setIsDisabled(_prevState => !_prevState);
    }

    const toggleAddDiscipline = () => {
        setAddDiscipline(_prevState => !_prevState);
    }

    const buttonStyle = {
        width: 120,
        marginLeft: 10
    }

    const disciplinesElements = teacher.pointsheets!.map((sheet, index) => (
        <SheetRow
            key={`${teacher.id}${sheet.discipline}${index}`}
            sheet={sheet}
            teacher={teacher}
            setTeacher={setTeacher}
        />
    ));

    const tutoringDisciplinesElements = teacher.pointsheets?.filter(sheet => sheet.course !== 'TUTORIA').map(sheet => {
        return (
            <div
                onClick={() => selectTutoringSheet(sheet)}
                style={tutoringSheet && tutoringSheet !== sheet ? { display: 'none' } : {}}
                className={tutoringSheet === sheet ? 'box select' : 'box'}
            >
                {sheet.discipline}
            </div>
        );
    });

    const courseElements = courseList.map(course => {
        const courseName = course.split(' ').map(e => toCapitalize(e)).toString().replaceAll(",", " ");
        const isSelected = course === currentCourse;

        return (
            <div
                className={isSelected ? 'box select' : 'box'}
                onClick={() => selectCourse(course)}
                key={course}
            >
                {courseName}
            </div>
        );
    });

    const handlerTutoring = () => {
        if (!isAddingTutoring) setCurrentCourse('');
        setIsAddingTutoring(!isAddingTutoring);
    }

    const selectCourse = (course: string) => {
        if (course !== currentCourse) setCurrentCourse(course);
        else setCurrentCourse('');

        if (isAddingTutoring) setIsAddingTutoring(false);
    }

    const selectTutoringSheet = (sheet: Pointsheet) => {
        if (tutoringSheet === sheet) setTutoringSheet(null);
        else setTutoringSheet(sheet);
    }

    const updateTeacher = async () => {
        event?.preventDefault();

        if (name === teacher.name && masp === teacher.masp || !teacher.id) {
            toggleDisabled();
            return;
        }

        const teacherDoc = doc(db, "teachers", teacher.id);
        const updatedTeacher = {
            ...teacher,
            name,
            masp,
        };

        await updateDoc(teacherDoc, updatedTeacher);
        setTeachers(_prevState => {
            const teachersList = _prevState;
            const index = teachersList.indexOf(teacher);
            teachersList[index].name = updatedTeacher.name;
            teachersList[index].masp = updatedTeacher.masp;

            return teachersList;
        });

        setTeacher(updatedTeacher);

        toggleDisabled();
        setShowSucessPopUp(true);
    }

    useEffect(() => {
        document.title = `SGCFP - ${teacher.name}`
    })

    return (
        <section>
            <div className="container--teacher">
                <span>
                    <Link to='/spreadsheets'>
                        {`> `}Dados
                    </Link>
                    {` / ${teacher.name}`}
                </span>
                <div className="container--info teacher">
                    <div className="info-title">
                        <strong>Professor</strong>
                    </div>
                    <div className="top-line"></div>
                    <form className="info--row" onSubmit={updateTeacher}>
                        <Input
                            label='Nome'
                            value={name}
                            setValue={setName}
                            width={480}
                            isDisabled={isDisabled}
                        />
                        <Input
                            label='masp'
                            value={masp}
                            width={160}
                            isDisabled={isDisabled}
                            setValue={setMasp}
                        />
                        {isDisabled ? (
                            <Button
                                title='Editar'
                                style={buttonStyle}
                                icon={(
                                    <BiEdit fill="#fff" size={20} />
                                )}
                                onClick={toggleDisabled}
                            />
                        ) : (
                            <Button
                                title='Salvar'
                                style={buttonStyle}
                                icon={(
                                    <BiSave fill="#fff" size={20} />
                                )}
                                onClick={updateTeacher}
                                submit={true}
                            />
                        )}
                    </form>
                </div>
                <div className="container--info teacher">
                    <div className="info-title">
                        <strong>Disciplinas</strong>
                    </div>
                    <div className="top-line"></div>
                    <div
                        className="add-discipline"
                        onClick={toggleAddDiscipline}
                    >
                        {addDiscipline ? (
                            <>
                                <BiXCircle fill="#fff" size={20} />
                                <div className="tooltip">{toCapitalize('cancelar')}</div>
                            </>
                        ) : (
                            <>
                                <BiPlusCircle fill="#fff" size={20} />
                                <div className="tooltip">{toCapitalize('Adicionar Disciplina')}</div>
                            </>
                        )}
                    </div>
                    <strong className="disclaimer">ATENÇÃO: Você está usando o calendário <span>{semester}</span></strong>
                    {addDiscipline && (
                        <div className="new-sheet">
                            <div className="box--container">
                                <div
                                    onClick={handlerTutoring}
                                    className={isAddingTutoring ? 'box select' : 'box'}
                                >
                                    Tutoria
                                </div>
                                {courseElements}
                            </div>

                            {isAddingTutoring ? (
                                <div>
                                    <div className="select--discipline">
                                        <strong>Disciplina </strong>
                                        <div className="box--disciplines">
                                            {tutoringDisciplinesElements}
                                        </div>
                                    </div>
                                    {tutoringSheet && (
                                        <TutoringSheetRow
                                            teacher={teacher}
                                            sheet={tutoringSheet!}
                                            setShow={toggleAddDiscipline}
                                        />
                                    )}
                                </div>
                            ) : (
                                <AddSheetRow
                                    teacher={teacher}
                                    setShow={toggleAddDiscipline}
                                    course={currentCourse}
                                />
                            )}
                        </div>
                    )}
                    {disciplinesElements}

                </div>
            </div>
            <SavedPopUp
                setShow={setShowSucessPopUp}
                show={showSucessPopUp}
            />
        </section>
    )
}

export default Teacher;