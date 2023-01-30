import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { BiTrash } from 'react-icons/bi';

import '../styles/CustomSelect.scss';

import { TimesSelect } from '../components';

import { Schedules } from '../types/DataTypes';
import { Button } from '.';

type CustomSelectProps = {
    value: string;
    label: string;
    width: number;
    isDisabled: boolean;
    fontSize?: number;
    setSchedule: Dispatch<SetStateAction<Schedules[]>>;
}

function CustomSelect(props: CustomSelectProps) {
    const [isSelected, setIsSelected] = useState(false);
    const hasValue = props.value !== '';

    const text = hasValue ? props.value : 'Selecionar...';

    const styles = {
        width: props.width,
    };
    const textStyle = {
        fontSize: props.fontSize,
    }

    const containerClassName = props.isDisabled ?
        'container--select disabled' :
        hasValue ? 'container--select hasValue' : 'container--select';

    const toggleIsSelected = () => {
        if (props.isDisabled) return;
        else setIsSelected(_prevState => !_prevState);
    }

    const clearSchedules = () => {
        props.setSchedule([]);
    }

    useEffect(() => {
        if (props.isDisabled) setIsSelected(false);
    }, [props.isDisabled])

    return (
        <div className='container--custom-select'>
            <div
                id="custom--select"
                className={containerClassName}
                style={styles}
                onClick={toggleIsSelected}
            >
                <span style={textStyle}>{text}</span>
                <div className="label">{props.label}</div>
                {!props.isDisabled && text != 'Selecione...' && (
                    <div className="clear-button" onClick={clearSchedules}>
                        <BiTrash fill="#6c757d" size={16} />
                    </div>
                )}
            </div>

            <div className="select-option--box">
                <TimesSelect
                    show={isSelected}
                    toggleShow={toggleIsSelected}
                    setSchedule={props.setSchedule}
                />
            </div>
        </div>
    )
}

export default CustomSelect