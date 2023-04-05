import { EadSchoolDays, ScheduleEad, ScheduleReplacement, TeacherPointSheet } from "../types/DataTypes"

import '../styles/NormalPointsheet.scss';
import { useDataContext, useRenderReplacementContext } from "../contexts";
import { getSchoolDaysList } from "../utils";

type Props = {
    pointsheet: TeacherPointSheet;
}

function EadPointsheet(props: Props) {
    const { calendar } = useDataContext();
    const { eadInfo, type } = useRenderReplacementContext();

    const schedules: ScheduleEad[] = [];
    eadInfo.forEach(e => {
        const classInfo: ScheduleEad[] = e.classTimes.map((time, index) => ({
            date: e.classDate,
            time: time.time,
        }));

        if (!schedules.some(e => classInfo.some(info => info === e)))
            schedules.push(...classInfo);
    });

    const eadSchoolDays: EadSchoolDays[] = getSchoolDaysList(schedules)

    const schoolDaysElements = eadSchoolDays.map(day => {
        const dayElements = day.schedules.map(sch => {
            return (
                <tr>
                    <td className="ead--pointsheet">{sch.date}</td>
                    <td className="ead--pointsheet">{sch.time}º</td>
                    <td className="ead--pointsheet"></td>
                </tr>
            )
        });

        const classElements = (
            <>
                <caption><strong>{day.month}</strong></caption>
                {dayElements}
            </>
        );

        return classElements;
    });

    return (
        <div className="sheet--container">
            <strong style={{ alignSelf: 'flex-start' }}>
                Folha de Frequência - {' '}
                {props.pointsheet.sheet.course}
            </strong>
            <div className="pointsheet--header">
                <div className="info">
                    <strong>Professor</strong>
                    <span>{props.pointsheet.name.toUpperCase()}</span>
                </div>
                <div className="info">
                    <strong>MASP</strong>
                    <span>{props.pointsheet.masp}</span>
                </div>
                <div className="info">
                    <strong>DISCIPLINA</strong>
                    <span>{props.pointsheet.sheet.discipline}</span>
                </div>
                <div className="info">
                    <strong>PERÍODO</strong>
                    <span>{props.pointsheet.sheet.period}º</span>
                </div>
                <div className="info">
                    <strong>C.H</strong>
                    <span>{props.pointsheet.sheet.workload}h/a</span>
                </div>
            </div>

            <table className="pointsheet-table">
                <thead>
                    <tr className="ead--pointsheet"><th>DATA</th></tr>
                    <tr className="ead--pointsheet"><th>AULA/EAD</th></tr>
                    <tr className="ead--pointsheet"><th>ASSINATURA</th></tr>
                </thead>
                <tbody>
                    {schoolDaysElements}
                </tbody>
            </table>
        </div>
    )
}

export default EadPointsheet