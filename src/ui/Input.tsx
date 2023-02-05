import { Dispatch, SetStateAction, useRef, useState } from 'react';

import '../styles/Input.scss';

type InputProps = {
    value: string | number;
    label: string;
    width?: number;
    isDisabled: boolean;
    fontSize?: number;
    setValue: (value: any) => void;
    sufix?: string;
}

function Input(props: InputProps) {
    const inputElement = useRef<HTMLInputElement | null>(null);

    const isANumber = typeof(props.value) === 'number';

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
        let caseNumber = inputElement.current?.value || 0;

        if (isANumber) props.setValue(caseNumber);
        else props.setValue(caseText.toUpperCase());
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
                required
            />
            <label htmlFor="input" onClick={focusInput}>{props.label}</label>
            {props.sufix && (
                <div className="sufix">{props.sufix}</div>
            )}
        </div>
    )
}

export default Input