import { useState } from 'react';
import { BiChevronDown } from "react-icons/bi";

function Select() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleIsOpen() {
        setIsOpen(state => !state);
    }

    return (
        <div className="container_select">
            <div className="select__box" onClick={toggleIsOpen}>
                <span>01/2023</span>
                <BiChevronDown />
            </div>
            {isOpen && (
                <ul className="select__options">
                    <li>02/2023 <hr /></li>
                    <li>01/2023 <hr /></li>
                    <li>02/2024 <hr /></li>
                    <li>01/2024 <hr /></li>
                </ul>
            )}
        </div>
    )
}

export default Select