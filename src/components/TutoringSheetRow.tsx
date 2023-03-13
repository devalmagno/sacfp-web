import { useState } from 'react';
import { doc, updateDoc } from '@firebase/firestore';
import { BiSave } from 'react-icons/bi';

import { Input, Button, CustomSelect, SavedPopUp } from '../ui';

import { Pointsheet, Teacher, Schedules } from '../types/DataTypes';

import { db } from '../services/firebaseConfig';

import '../styles/Teacher.scss';
import '../styles/SheetRow.scss';
import { useDataContext } from '../contexts';

type TutoringSheetRowType = {
    teacher: Teacher;
    sheet: Pointsheet;
    setShow: () => void;
}

function TutoringSheetRow(props: TutoringSheetRowType) {
    const { setTeachers, semester } = useDataContext();

    const [course, setCourse] = useState('TUTORIA');
    const [period, setPeriod] = useState(props.sheet.period);
    const [discipline, setDiscipline] = useState(props.sheet.discipline);
    const [workload, setWorkload] = useState(props.sheet.workload);
    const [schedules, setSchedules] = useState<Schedules[]>([]);

    const [showSucessPopUp, setShowSucessPopUp] = useState(false);

    const scheduleList = schedules.map(sch => {
        const { day, times } = sch;
        const formatedTimes = times.map(time => `${time}º`);

        const formatedSchedule = `${day.toUpperCase().substring(0, 3)}: ${formatedTimes} `;
        return formatedSchedule.substring(0, formatedSchedule.length);
    }).toString();

    const updateSheet = async () => {
        event?.preventDefault();

        console.log(props.teacher.pointsheets);

        const newSheet: Pointsheet = {
            course,
            period,
            discipline,
            workload,
            schedules,
            course_code: '',
            semester,
        };

        if (props.teacher.id === '' || !props.teacher.pointsheets) return;
        const teacherDoc = doc(db, "teachers", props.teacher.id);
        let updatedSheets = props.teacher.pointsheets;
        updatedSheets!.push(newSheet)
        const updatedTeacher: Teacher = {
            ...props.teacher,
            pointsheets: updatedSheets,
        };

        await updateDoc(teacherDoc, updatedTeacher);

        setTeachers(_prevState => {
            const teachersList: Teacher[] = _prevState;
            const index = teachersList.indexOf(props.teacher);
            teachersList.splice(index, 1);
            teachersList.push(updatedTeacher);
            
            return teachersList;
        });

        setShowSucessPopUp(true);

        setTimeout(() => {
            props.setShow();
        }, 2500);
    }

    return (
        <form className="info--row" onSubmit={updateSheet}>
            <Input
                label='curso'
                value={course}
                width={164}
                isDisabled={false}
                setValue={setCourse}
            />
            <Input
                label='PER.'
                value={period}
                width={56}
                isDisabled={false}
                setValue={setPeriod}
                sufix='º'
            />
            <Input
                label='disciplina'
                value={discipline}
                width={240}
                isDisabled={false}
                setValue={setDiscipline}
            />
            <Input
                label='CH'
                value={'02'}
                width={82}
                isDisabled={true}
                setValue={setWorkload}
                sufix='h/a'
            />
            <CustomSelect
                label='horarios'
                value={scheduleList}
                width={256}
                isDisabled={false}
                setSchedule={setSchedules}
            />
            <div className="buttons">
                <Button
                    title='Salvar'
                    icon={<BiSave fill="#fff" size={24} />}
                    tooltip='Salvar'
                    submit={true}
                />
            </div>
            <SavedPopUp
                setShow={setShowSucessPopUp}
                show={showSucessPopUp}
            />
        </form>
    )
}

export default TutoringSheetRow