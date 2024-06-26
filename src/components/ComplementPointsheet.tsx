import { Fragment } from 'react';

import { EadSchoolDays, ScheduleEad, ScheduleReplacement, TeacherPointSheet } from "../types/DataTypes"

import '../styles/NormalPointsheet.scss';
import { useDataContext, useRenderReplacementContext } from "../contexts";
import { getSchoolDaysList } from "../utils";

type Props = {
    pointsheet: TeacherPointSheet;
}

function ComplementPointsheet(props: Props) {
    const { calendar } = useDataContext();
    const { eadInfo, observation } = useRenderReplacementContext();

    const filteredEadInfo = eadInfo.map(e => {
        const classTimes = e.classTimes.filter(time => time.isSelected);

        return {
            ...e,
            classTimes,
        };
    });

    const schedules: ScheduleEad[] = [];
    filteredEadInfo.forEach(e => {
        const classInfo: ScheduleEad[] = e.classTimes.filter(time => time.isSelected)
            .map((time, index) => ({
                date: e.classDate,
                time: time.time,
            }));

        if (!schedules.some(e => classInfo.some(info => info === e)))
            schedules.push(...classInfo);
    });

    const eadSchoolDays: EadSchoolDays[] = getSchoolDaysList({
        calendar,
        schoolDays: schedules
    });

    const schoolDaysElements = eadSchoolDays.map((day, index) => {
        const dayElements = day.schedules.map(sch => {
            return (
                <tr key={`${sch.date}${sch.time}`}>
                    <td>{sch.date}</td>
                    <td>{sch.time}º</td>
                    <td>{sch.description}</td>
                </tr>
            )
        });

        const classElements = (
            <Fragment key={`${day.schedules[0].date}${index}`}>
                <caption><strong>{day.month}</strong></caption>
                {dayElements}
            </Fragment>
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

            <div className="sheet--disclaimer">
                Obs.: {observation}
            </div>

            <table className="pointsheet-table">
                <thead>
                    <tr><th>DATA</th></tr>
                    <tr><th>AULA</th></tr>
                    <tr><th>ASSINATURA</th></tr>
                </thead>
                <tbody>
                    {schoolDaysElements}
                </tbody>
            </table>
        </div>
    )
}

export default ComplementPointsheet