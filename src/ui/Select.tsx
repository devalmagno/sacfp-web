import { useState } from 'react';
import { BiChevronDown } from "react-icons/bi";
import { useDataContext } from '../contexts';

import '../styles/SelectSemester.scss';
import { Calendar } from '../types/DataTypes';

function Select() {
    const [isOpen, setIsOpen] = useState(false);

    const {
        calendarList,
        semester,
        calendar,
        setCalendar,
        setSemester
    } = useDataContext();

    const acronym = calendar && calendar.acronym ? calendar.acronym : '';

    const semesterElements = calendarList
        .filter(elem => elem !== calendar)
        .map(elem => {
            let semester = elem.semester;
            if (elem.acronym) semester += elem.acronym;

            return (
                <li key={elem.id} onClick={() => changeCurrentCalendar(elem)}>
                    {semester}
                    <hr />
                </li>
            )
        })

    function toggleIsOpen() {
        setIsOpen(state => !state);
    }

    const changeCurrentCalendar = (selected: Calendar) => {
        setCalendar(selected);
        setSemester(selected.semester)
    }

    return (
        <div id="under" className="container_select">
            <div className="select__box" onClick={toggleIsOpen}>
                <span>{semester}{acronym}</span>
                <BiChevronDown />
            </div>
            {isOpen && (
                <ul className="select__options">
                    {semesterElements}
                </ul>
            )}
        </div>
    )
}

export default Select