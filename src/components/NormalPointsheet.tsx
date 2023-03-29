import { TeacherPointSheet } from "../types/DataTypes"

import '../styles/NormalPointsheet.scss';
import { getDates } from "../utils";
import { useDataContext } from "../contexts";

type Props = {
    pointsheet: TeacherPointSheet;
}

function NormalPointsheet(props: Props) {
    const { calendar } = useDataContext();

    const schoolDays = getDates({
        calendar,
        schedules: props.pointsheet.sheet.schedules!,
        workload: props.pointsheet.sheet.workload,
    });

    const schoolDaysElements = schoolDays.map(day => {
        const dayElements = day.schedules.map(sch => {
            return (
                <tr>
                    <td>{sch.date}</td>
                    <td>{sch.time}º</td>
                    <td>{sch.description}</td>
                </tr>
            )
        });

        return dayElements;
    })

    return (
        <div className="sheet--container">
            <strong style={{ alignSelf: 'flex-start' }}>
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

export default NormalPointsheet