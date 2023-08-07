import { useState, ReactNode } from 'react';
import { CgDetailsMore, CgDetailsLess } from 'react-icons/cg';

import '../styles/Details.scss';

type Props = {
    title: string;
    isOpen?: boolean;
    children: ReactNode;
}

export default function Details(props: Props) {
    const [isOpen, setIsOpen] = useState(props.isOpen ? props.isOpen : false);

    return (
        <div className="details">
            <div className='summary' onClick={() => { setIsOpen(prevState => !prevState) }}>
                {isOpen ? (
                    <CgDetailsMore fill='#333A56' size={16} />
                ) : (
                    <CgDetailsLess fill='#333A56' size={16} />
                )}
                <strong>{props.title}</strong>
            </div>

            {isOpen && props.children}
        </div>
    );
}