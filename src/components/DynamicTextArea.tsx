import React, { Dispatch, SetStateAction, useRef } from 'react';

import "../styles/TextArea.scss"

interface Props {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

const DynamicTextarea = (props: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleTextareaChange = ( value: string ) => {
        props.setValue(value)

        const textarea = textareaRef.current;
        if (textarea == null) return;
        textarea.style.height = 'auto'; // Reset the height to auto to adjust it to the content
        textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the content
    };

    return (
        <textarea
            ref={textareaRef}
            className="textarea"
            rows={3} // Set an initial number of rows
            onChange={(e) => handleTextareaChange(e.target.value)}
            placeholder="Digite a observação..."
        />
    );
};

export default DynamicTextarea;
