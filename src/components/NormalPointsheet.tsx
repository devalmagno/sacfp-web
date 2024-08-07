import { Fragment, useState } from "react";
import { IoAnalyticsOutline } from "react-icons/io5";

import { TeacherPointSheet } from "../types/DataTypes";

import "../styles/NormalPointsheet.scss";
import { getDates } from "../utils";
import { useDataContext } from "../contexts";

type Props = {
  pointsheet: TeacherPointSheet;
};

function NormalPointsheet(props: Props) {
  const { calendar, config } = useDataContext();
  const [showClassCount, setShowClassCount] = useState(false);

  let classCount = 0;

  const schoolDays = getDates({
    calendar,
    schedules: props.pointsheet.sheet.schedules!,
    workload: props.pointsheet.sheet.workload,
    limitPointGeneration: config.limitPointGeneration,
  });

  const schoolDaysElements = schoolDays.map((day, index) => {
    const dayElements = day.schedules.map((sch) => {
      if (
        (showClassCount && sch.description === "") ||
        sch.description === "FEPEG"
      ) {
        classCount++;
        return (
          <tr key={`${sch.date}${sch.time}`}>
            <td>{sch.date}</td>
            <td>{sch.time}º</td>
            <td>
              {sch.description !== ""
                ? `${sch.description} - Aula ${classCount}`
                : `Aula ${classCount}`}
            </td>
          </tr>
        );
      } else
        return (
          <tr key={`${sch.date}${sch.time}`}>
            <td>{sch.date}</td>
            <td>{sch.time}º</td>
            <td>{sch.description}</td>
          </tr>
        );
    });

    const classElements = (
      <Fragment key={`${day.schedules[0].date}${index}`}>
        <caption>
          <strong>{day.month}</strong>
        </caption>
        {dayElements}
      </Fragment>
    );

    return classElements;
  });

  return (
    <div className="sheet--container">
      <strong style={{ alignSelf: "flex-start" }}>
        Folha de Frequência - {props.pointsheet.sheet.course}
      </strong>
      <div
        className="count-classes"
        onClick={() => {
          setShowClassCount((state) => !state);
        }}
      >
        <IoAnalyticsOutline fill="#333A56" size={16} />
        <strong>Contar Aulas</strong>
      </div>

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
          <tr>
            <th>DATA</th>
          </tr>
          <tr>
            <th>AULA</th>
          </tr>
          <tr>
            <th>ASSINATURA</th>
          </tr>
        </thead>
        <tbody>{schoolDaysElements}</tbody>
      </table>
    </div>
  );
}

export default NormalPointsheet;
