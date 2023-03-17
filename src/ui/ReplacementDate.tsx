import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputDate from "./InputDate"
import { ClassTimesProps, ReplacementInfo, TeacherPointSheet } from "../types/DataTypes";
import { arrayRange, convertStringToDate, getDayName, sortNumericalRising } from "../utils";
import Button from "./Button";
import { BiPlus } from "react-icons/bi";

type Props = {
    type: string;
    sheet: TeacherPointSheet;
    replacementInfo: ReplacementInfo[];
    setReplacementInfo: Dispatch<SetStateAction<ReplacementInfo[]>>;
}

function ReplacementDate(props: Props) {
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
        const replacement: ReplacementInfo = {
            classDate,
            classTimes,
            replacementDate,
            replacementTimes
        };
        const replacementList = props.replacementInfo.slice();

        if (replacementList.some(e => e === replacement)) return;

        replacementList.push(replacement);
        props.setReplacementInfo(replacementList);

        setClassDate('');
        setReplacementDate('');
        setClassTimes([]);

        const replacementTimesList = replacementTimes
            .map(e => ({
                ...e,
                isSelected: false
            }));
        setReplacementTimes(replacementTimesList);
    }

    useEffect(() => {

        if (classDate.length == 10) {
            const schedule = props.sheet.sheet.schedules!.filter(time => time.day === getDayName(classDate))[0];
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
            <div className="flex-column">
                <div className="flex-row">
                    <InputDate
                        label={`Data ${props.type}`}
                        value={replacementDate}
                        setValue={setReplacementDate}
                        isDisabled={!classTimes.some(e => e.isSelected)}
                        width={246}
                    />
                    {classDate.length === 10 &&
                        replacementDate.length === 10 &&
                        !isAfterReplacementBlocked &&
                        !isBeforeReplacementBlocked &&
                        classTimes.filter(e => e.isSelected).length ===
                        replacementTimes.filter(e => e.isSelected).length && (
                            <Button
                                icon={<BiPlus fill="#fff" size={20} />}
                                onClick={addToList}
                            />
                        )}
                </div>
                {isBeforeReplacementBlocked && (
                    <strong className="replacement--warning">Data da Anteposição deve ser antes da data da aula</strong>
                )}
                {isAfterReplacementBlocked && (
                    <strong className="replacement--warning">Data da Reposição deve ser após a da data da aula</strong>
                )}
                {!isAfterReplacementBlocked && !isBeforeReplacementBlocked && replacementDate.length === 10 && (
                    <div className="flex-row">
                        {replacementTimesElements}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReplacementDate