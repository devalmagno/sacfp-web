import { Dispatch, SetStateAction, useState } from 'react';
import { updateDoc, collection, doc } from '@firebase/firestore';
import { BiEdit, BiSpreadsheet, BiSave, BiTrash } from 'react-icons/bi';

import { Input, Button, CustomSelect, SavedPopUp } from '../ui';

import { db } from '../services/firebaseConfig';

import { Pointsheet, Schedules, Teacher, TeacherPointSheet } from '../types/DataTypes';

import '../styles/Teacher.scss';
import '../styles/SheetRow.scss';
import { useDataContext } from '../contexts';
import { generateDocument } from '../utils';

type SheetRowProps = {
    sheet: Pointsheet;
    teacher: Teacher;
    setTeacher: Dispatch<SetStateAction<Teacher>>;
}

function SheetRow(props: SheetRowProps) {
    const { teachers, setTeachers, calendar, semester } = useDataContext();

    const [isDisabled, setIsDisabled] = useState(true);
    const [isGeneratePointsheetDisabled, setIsGeneratePointsheetDisabled] = useState(props.sheet.schedules?.length === 0);
    const [course, setCourse] = useState(props.sheet.course);
    const [period, setPeriod] = useState(props.sheet.period.split(' ')[0].split('º')[0]);
    const [discipline, setDiscipline] = useState(props.sheet.discipline);
    const [workload, setWorkload] = useState(props.sheet.workload);
    const [schedules, setSchedules] = useState<Schedules[]>(props.sheet.schedules || []);

    const [showSucessPopUp, setShowSucessPopUp] = useState(false);

    const [teacherPointsheet, setTeacherPointsheet] = useState<TeacherPointSheet>({
        id: props.teacher.id,
        name: props.teacher.name,
        masp: props.teacher.masp,
        sheet: props.sheet,
    });

    const scheduleList = schedules.map(sch => {
        const { day, times } = sch;
        const formatedTimes = times.map(time => `${time}º`);

        const formatedSchedule = `${day.toUpperCase().substring(0, 3)}: ${formatedTimes} `;
        return formatedSchedule.substring(0, formatedSchedule.length);
    }).toString();

    const toggleIsDisabled = () => {
        event?.preventDefault();
        setIsDisabled(_prevState => !_prevState);
    }

    const updateSheet = async () => {
        event?.preventDefault();

        const newSheet: Pointsheet = {
            ...props.sheet,
            course,
            period,
            discipline,
            workload,
            schedules
        };

        if (!props.teacher.id) return;
        const teacherDoc = doc(db, "teachers", props.teacher.id);
        const sheetIndex = props.teacher.pointsheets!.indexOf(props.sheet);
        let updatedSheets = props.teacher.pointsheets;
        updatedSheets!.splice(sheetIndex, 1);
        updatedSheets!.push(newSheet)
        const updatedTeacher: Teacher = {
            ...props.teacher,
            pointsheets: updatedSheets,
        };

        await updateDoc(teacherDoc, updatedTeacher);

        setTeachers(_prevState => {
            const teachersList = _prevState;
            const indexTeacher = teachersList.indexOf(props.teacher);
            teachersList[indexTeacher].pointsheets = updatedSheets;

            return _prevState;
        });

        setTeacherPointsheet(_prevState => {
            const teacher = _prevState;

            return {
                ...teacher,
                sheet: newSheet,
            }
        });

        setIsGeneratePointsheetDisabled(false);

        toggleIsDisabled();
        setShowSucessPopUp(true);
    }

    const removeSheet = async () => {
        if (!props.teacher.id) return;
        const teacherDoc = doc(db, "teachers", props.teacher.id);
        const sheetIndex = props.teacher.pointsheets!.indexOf(props.sheet);
        let updatedSheets = props.teacher.pointsheets ? [...props.teacher.pointsheets] : [];
        updatedSheets!.splice(sheetIndex, 1);

        const updatedTeacher: Teacher = {
            ...props.teacher,
            pointsheets: updatedSheets,
        };

        await updateDoc(teacherDoc, updatedTeacher);
        props.setTeacher(updatedTeacher);

        const teachersList = teachers.slice();
        const indexTeacher = teachersList.indexOf(props.teacher);
        teachersList.splice(indexTeacher, 1);
        teachersList.push(updatedTeacher);

        setTeachers([...teachersList]);

        setShowSucessPopUp(true);
    }

    return (
        <form className="info--row" onSubmit={updateSheet}>
            <Input
                label='curso'
                value={course}
                width={164}
                isDisabled={isDisabled}
                setValue={setCourse}
            />
            <Input
                label='PER.'
                value={period}
                width={56}
                isDisabled={isDisabled}
                setValue={setPeriod}
                sufix='º'
            />
            <Input
                label='disciplina'
                value={discipline}
                width={240}
                isDisabled={isDisabled}
                setValue={setDiscipline}
            />
            <Input
                label='CH'
                value={workload}
                width={82}
                isDisabled={isDisabled}
                setValue={setWorkload}
                sufix='h/a'
            />
            <CustomSelect
                label='horarios'
                value={scheduleList}
                width={256}
                isDisabled={isDisabled}
                setSchedule={setSchedules}
            />
            <div className="buttons">
                {isDisabled ? (
                    <Button
                        icon={<BiEdit fill="#fff" size={24} />}
                        tooltip='Editar'
                        onClick={toggleIsDisabled}
                    />
                ) : (
                    <Button
                        icon={<BiSave fill="#fff" size={24} />}
                        tooltip='Salvar'
                        onClick={updateSheet}
                        submit={true}
                    />
                )}
                {isDisabled ? (
                    <Button
                        icon={<BiSpreadsheet fill="#fff" size={24} />}
                        tooltip='folha de ponto'
                        onClick={() => generateDocument({ calendar, pointsheet: teacherPointsheet, semester, save: true })}
                        isDisabled={isGeneratePointsheetDisabled}
                    />)
                    : (
                        <Button
                            icon={<BiTrash fill="#fff" size={24} />}
                            tooltip='apagar'
                            onClick={removeSheet}
                        />
                    )
                }
            </div>
            <SavedPopUp
                setShow={setShowSucessPopUp}
                show={showSucessPopUp}
            />
        </form>
    )
}

export default SheetRow