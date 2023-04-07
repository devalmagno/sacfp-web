import { ScheduleReplacement, TeacherPointSheet } from "../types/DataTypes"

import '../styles/NormalPointsheet.scss';
import { useDataContext, useRenderReplacementContext } from "../contexts";

type Props = {
    pointsheet: TeacherPointSheet;
}

function ReplacementPointsheet(props: Props) {
    const { calendar } = useDataContext();
    const { replacementInfo, type } = useRenderReplacementContext();

    const schedules: ScheduleReplacement[] = [];
    replacementInfo.forEach(e => {
        const classInfo: ScheduleReplacement[] = e.classTimes.map((time, index) => ({
            classDate: e.classDate,
            classTime: time.time,
            replacementDate: e.replacementDate,
            replacementTime: e.replacementTimes[index].time
        }));

        if (!schedules.some(e => classInfo.some(info => info === e)))
            schedules.push(...classInfo);
    });

    const schoolDaysElements = schedules.map(day => {
        const description = calendar.activity_dates.some(e => e.date === day.replacementDate) ?
            calendar.activity_dates.find(e => e.date === day.replacementDate)?.description :
            '';

        return (
            <tr
                key={`${day.classDate}${day.classTime}${day.replacementTime}`}
            >
                <td className="replacement--pointsheet">{day.classDate}</td>
                <td className="replacement--pointsheet">{day.classTime}º</td>
                <td className="replacement--pointsheet">{day.replacementDate}</td>
                <td className="replacement--pointsheet">{day.replacementTime}º</td>
                <td className="replacement--pointsheet">{description}</td>
           </tr>
        );
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
                <caption className="table--header">
                    <div>AULA</div>
                    <div>{type.toUpperCase()}</div>
                    <div>ASSINATURA</div>
                </caption>
                <thead>
                    <tr className="replacement--pointsheet"><th>DIA</th></tr>
                    <tr className="replacement--pointsheet"><th>HORARIO</th></tr>
                    <tr className="replacement--pointsheet"><th>DIA</th></tr>
                    <tr className="replacement--pointsheet"><th>HORARIO</th></tr>
                    <tr className="replacement--pointsheet"><th></th></tr>
                </thead>
                <tbody>
                    {schoolDaysElements}
                </tbody>
            </table>
        </div>
    )
}

export default ReplacementPointsheet