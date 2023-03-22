import { Dispatch, SetStateAction, useState } from 'react';
import { BiMessageSquareX, BiPlus } from 'react-icons/bi';

import { arrayRange, toCapitalize } from '../utils';
import { Button } from '../ui';

import { Schedules } from '../types/DataTypes';

import '../styles/TimesSelect.scss';

type Props = {
    show: boolean;
    toggleShow: () => void;
    setSchedule: Dispatch<SetStateAction<Schedules[]>>;
}

function TimesSelect(props: Props) {
    const [schedules, setSchedules] = useState<Schedules[]>([]);
    const [currentSchedule, setCurrentSchedule] = useState<Schedules>({
        day: '',
        times: [],
    });
    const [isAddingSchedule, setIsAddingSchedule] = useState(false);

    const isAddCurrentScheduleButtonDisabled = !(currentSchedule.times.length > 0);
    const isAddScheduleButtonDisabled = !(currentSchedule.times.length > 0);

    const days = ["segunda", "terça", "quarta", "quinta", "sexta"];
    const times = arrayRange({
        start: 1,
        step: 1,
        stop: 17,
    });

    const daysElements = days.map(el => {
        const day = toCapitalize(el);

        const selected = schedules.some(e => e.day === el) ||
            currentSchedule?.day === el;

        const func = () => {
            el === currentSchedule?.day ?
                removeFromCurrentSchedule() :
                isAddingSchedule ?
                    () => { } :
                    selected ?
                        removeFromSchedules(el) :
                        addCurrentScheduleDay(el);
        };

        return (
            <div
                className={selected ?
                    "selectable-box selected" :
                    "selectable-box"
                }
                key={el}
                onClick={func}
            >
                <span>{day}</span>
            </div>
        );
    });

    const timesElements = times.map(el => {
        const times = `${el}º`;

        const selected = currentSchedule.times.some(e => e === el);

        const func = () => {
            selected ?
                removeTimesFromCurrentSchedule(el) :
                addTimesToCurrentSchedule(el);
        }

        return (
            <div className={selected ?
                "selectable-box selected" :
                "selectable-box"
            }
                onClick={func}
                key={el}
            >
                <span>{times}</span>
            </div>
        );
    });

    const summaryElements = schedules.map(sch => {
        const day = toCapitalize(sch.day);
        const times = sch.times.map(time => `${time}º`)
            .toString();

        return <span key={`${sch.day}${sch.times}`}>{`${day}: ${times}`}</span>
    })

    const addCurrentScheduleDay = (day: string) => {
        const schedule = { day, times: [] };

        setIsAddingSchedule(true);
        setCurrentSchedule(schedule);
    }

    const removeFromCurrentSchedule = () => {
        setCurrentSchedule({ day: '', times: [] });
        setIsAddingSchedule(false);
    }

    const addTimesToCurrentSchedule = (time: number) => {
        setCurrentSchedule(_prevState => {
            if (_prevState.times.some(e => e === time)) return _prevState;
            const timesList = _prevState.times;
            timesList.push(time)

            return {
                ..._prevState,
                times: timesList,
            }
        });
    }

    const removeTimesFromCurrentSchedule = (time: number) => {
        setCurrentSchedule(_prevState => {
            const timesList = _prevState.times.filter(t => t !== time)
                .map(t => t);

            return {
                ..._prevState,
                times: timesList,
            }
        });
    }

    const addToSchedules = () => {
        setSchedules(_prevState => ([
            ..._prevState,
            currentSchedule,
        ]));

        setCurrentSchedule({ day: '', times: [] });
        setIsAddingSchedule(false);
    }

    const removeFromSchedules = (day: string) => {
        setSchedules(_prevState => {
            const schedulesList = _prevState.filter(sch => sch.day !== day)
                .map(sch => sch);

            return schedulesList;
        });
    }

    const submitNewSchedules = () => {
        props.setSchedule(schedules);
        props.toggleShow();
    }

    return (
        <div
            className={props.show ?
                "container-select--times selected" :
                "container-select--times"
            }
        >
            <h4>Selecione os horarios...</h4>
            <div className="close-button" onClick={props.toggleShow}>
                <BiMessageSquareX size={24} />
                <div className="tooltip">
                    <span>Cancelar</span>
                </div>
            </div>
            <div className="container--attribute">
                <strong>Dia</strong>
                <div className="container--box">
                    {daysElements}
                </div>
            </div>

            {currentSchedule.day !== '' && (
                <div className="container--attribute">
                    <strong>Horários</strong>
                    <span>{currentSchedule.day.toUpperCase()}-FEIRA:</span>
                    <div className="container--box">
                        {timesElements}
                    </div>
                </div>
            )}

            <div className="container--attribute">
                <strong>Resumo</strong>
                {summaryElements.length != 0 ?
                    summaryElements :
                    <span>Nenhum item adicionado ainda.</span>
                }
            </div>

            <div className="button">
                {!isAddScheduleButtonDisabled ? (
                    <Button
                        icon={<BiPlus fill="#fff" size={16} />}
                        isDisabled={isAddCurrentScheduleButtonDisabled}
                        onClick={addToSchedules}
                    />
                ) : (
                    <Button
                        title='Adicionar'
                        isDisabled={schedules.length === 0}
                        onClick={submitNewSchedules}
                    />
                )}
            </div>
        </div>
    )
}

export default TimesSelect