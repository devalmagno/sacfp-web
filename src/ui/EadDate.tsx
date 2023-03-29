import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputDate from "./InputDate"
import { ClassTimesProps, EadInfo, TeacherPointSheet } from "../types/DataTypes";
import { arrayRange, convertDayNameEnUSToPtBR, convertStringToDate, getDayName, sortNumericalRising } from "../utils";
import Button from "./Button";
import { BiPlus } from "react-icons/bi";
import { useDataContext } from "../contexts";

type Props = {
    type: string;
    sheet: TeacherPointSheet;
    eadInfo: EadInfo[];
    setEadInfo: Dispatch<SetStateAction<EadInfo[]>>;
}

function EadDate(props: Props) {
    const [classDate, setClassDate] = useState('');
    const [classTimes, setClassTimes] = useState<ClassTimesProps[]>([]);

    const [replacementDate, setReplacementDate] = useState('');
    const [replacementTimes, setReplacementTimes] = useState<ClassTimesProps[]>(
        arrayRange({
            start: 1,
            step: 1,
            stop: 17,
        }).map(e => ({
            time: e,
            isSelected: false,
        }))
    );

    const { calendar } = useDataContext();

    const isBeforeReplacementBlocked = convertStringToDate(classDate) < convertStringToDate(replacementDate) &&
        props.type === "Anteposição";
    const isAfterReplacementBlocked = convertStringToDate(classDate) > convertStringToDate(replacementDate) &&
        props.type === "Reposição";

    const timesElement = classTimes.map(e => {
        const selected = e.isSelected;

        return (
            <div
                onClick={() => handlerClassTime(e)}
                className={selected ? 'box select' : 'box'}
                key={`${e.time}`}
            >
                <span>
                    {e.time}º
                </span>
            </div>
        )
    });

    const replacementTimesElements = replacementTimes.map(elem => {
        const isSelected = elem.isSelected;

        return (
            <div
                onClick={() => handlerReplacementTimes(elem)}
                className={isSelected ? 'box select' : 'box'}
                key={elem.time}
            >
                {elem.time}º
            </div>
        )
    });

    const handlerReplacementTimes = (elem: ClassTimesProps) => {
        const replacementTimesList = replacementTimes.slice();
        const index = replacementTimesList.indexOf(elem);

        replacementTimesList[index].isSelected = !elem.isSelected;

        setReplacementTimes(replacementTimesList);
    }

    const handlerClassTime = (classTime: ClassTimesProps) => {
        const classTimeList = [...classTimes];
        const index = classTimeList.indexOf(classTime);
        classTimeList[index].isSelected = !classTime.isSelected;

        const ascClassTimeList = classTimeList.sort((a, b) => sortNumericalRising(a.time, b.time));

        setClassTimes(ascClassTimeList);
    }

    const addToList = () => {
        const ead: EadInfo = {
            classDate,
            classTimes,
        };
        const eadList = props.eadInfo.slice();

        if (eadList.some(e => e === ead)) return;

        eadList.push(ead);
        props.setEadInfo(eadList);

        setClassDate('');
        setClassTimes([]);
    }

    useEffect(() => {

        if (classDate.length == 10) {
            const schedule = props.sheet.sheet.schedules!.find(time => {
                if (time.day === getDayName(classDate).ptBR) return time;
                else {
                    const schoolSaturday = calendar.activity_dates.find(date => {
                        if (date.type === 'school_saturday' &&
                            date.date === classDate &&
                            convertDayNameEnUSToPtBR(date.reference_day) === time.day) return date;
                    });

                    if (schoolSaturday) return time;
                }
            });

            const times: ClassTimesProps[] = [];

            if (schedule) {
                schedule.times.forEach(time => {
                    times.push({
                        time,
                        isSelected: false
                    });
                });

                setClassTimes(times);
            }
        } else setClassTimes([]);

    }, [classDate]);

    return (
        <div className="flex-column">

            <div className="flex-row">
                <InputDate
                    label='data aula'
                    value={classDate}
                    setValue={setClassDate}
                    isDisabled={false}
                    width={176}
                />
                {timesElement}
            </div>
            {classTimes.some(e => e.isSelected) && (
                <div className="flex-row" style={{ justifyContent: 'flex-end', }}>
                    <Button
                        icon={<BiPlus fill="#fff" size={20} />}
                        onClick={addToList}
                        style={{ width: 48 }}
                    />
                </div>
            )}
        </div>
    )
}

export default EadDate