import { Dispatch, SetStateAction, useRef, useState } from 'react';

import '../styles/Input.scss';
import { isValidDate } from '../utils';
import { useDataContext } from '../contexts';

type InputProps = {
    value: string;
    label: string;
    width?: number;
    isDisabled: boolean;
    fontSize?: number;
    setValue: Dispatch<SetStateAction<string>>;
    sufix?: string;
}

function InputDate(props: InputProps) {
    const { semester } = useDataContext();

    const [isValid, setIsValid] = useState(true);

    const inputElement = useRef<HTMLInputElement | null>(null);

    const style = {
        width: `${props.width}px`,
    };

    const inputStyle = {
        fontSize: `${props.fontSize}px`
    }

    const focusInput = () => {
        inputElement.current?.focus();
    }

    const handleChange = () => {
        let caseText = inputElement.current?.value || '';
        props.setValue(caseText);
        setIsValid(isValidDate(caseText, semester))
    } 

    const handleInputMask = (key: string) => {
        const value = props.value;
        let output = '';

        const keyValue = key[key.length - 1];
        const numbers = [...Array(10).keys()].map(e => `${e}`);
        const isANumber = numbers.some(n => n === keyValue);

        if (key === 'Backspace') return;
        if (key === 'Space' || value.length == 11 || !isANumber) {
            event?.preventDefault();
            return;
        }
        if (value.length == 10) {
            event?.preventDefault();
            return;
        }

        switch (value.length) {
            case 2:
                output += `${value}/`;
                break;
            case 5:
                output += `${value}/`;
                break;
            default:
                output = value;
        }

        props.setValue(output);
    }

    return (
        <div className="container--input" style={style}>
            <input
                id="input"
                type="text"
                value={props.value}
                onChange={handleChange}
                disabled={props.isDisabled}
                autoComplete='off'
                style={inputStyle}
                ref={inputElement}
                onKeyDown={e => handleInputMask(e.code)}
                required
            />
            <label htmlFor="input" onClick={focusInput}>{props.label}</label>
            {props.sufix && (
                <div className="sufix">{props.sufix}</div>
            )}

            {props.value.length > 3 && !isValid && (
                <span className="not-valid" style={{ fontSize: 13 }}>
                    Insira uma data válida.
                </span>
            )}
        </div>
    )
}

export default InputDate
