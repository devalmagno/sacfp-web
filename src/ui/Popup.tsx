import { useState } from 'react';

import Button from "./Button";

import '../styles/Popup.scss';

type PopupProps = {
    title: string;
    description: string;
    setIsShowing: (value: boolean) => void;
    setIsConfirmed: (value: boolean) => void;
}

function Popup(props: PopupProps) {
    const [promise, setPromise] = useState<Promise<number> | null>(null);

    const hidePopup = () => {
        props.setIsShowing(false);
    }

    const handlerConfirmation = () => {
        props.setIsConfirmed(true);
        props.setIsShowing(false);
    }

    return (
        <div
            className="popup--container"
            onClick={hidePopup}
        >
            <div className="popup--box">
                <h3>{props.title}</h3>
                <span>{props.description}</span>

                <hr />

                <div className="buttons">
                    <Button
                        title='cancelar'
                        style={{
                            background: 'transparent',
                            color: '#717171',
                            fontSize: 15,
                            boxShadow: 'none',
                        }}
                        onClick={hidePopup}
                    />
                    <Button
                        title='confirmar'
                        style={{
                            fontSize: 15,
                        }}
                    />

                </div>
            </div>
        </div>
    )
}

export default Popup