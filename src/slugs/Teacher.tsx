import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';

import { Button, Input } from '../ui';

import { Teacher as TeacherType } from '../types/DataTypes';

import '../styles/Teacher.scss';
import { SheetRow } from '../components';

function Teacher() {
    const route = useLocation();
    const teacher: TeacherType = route.state.teacher;

    const [isDisabled, setIsDisabled] = useState(true);

    const toggleDisabled = () => {
        setIsDisabled(_prevState => !_prevState);
    }

    const buttonStyle = {
        width: 120,
        marginLeft: 10
    }

    const disciplinesElements = teacher.pointsheets.map(sheet => (
        <SheetRow
            key={sheet.discipline}
            sheet={sheet}
        />
    ));

    return (
        <section>
            <div className="container--teacher">
                <span>
                    <Link to='/spreadsheets'>
                        {`> `}Dados
                    </Link>
                    {` / ${teacher.name}`}
                </span>
                <div className="container--info teacher">
                    <div className="info-title">
                        <strong>Professor</strong>
                    </div>
                    <div className="top-line"></div>
                    <div className="info--row">
                        <Input
                            label='Nome'
                            value={teacher.name}
                            width={480}
                            isDisabled={isDisabled}
                        />
                        <Input
                            label='masp'
                            value={teacher.masp}
                            width={160}
                            isDisabled={isDisabled}
                        />
                        <Button
                            title='Editar'
                            style={buttonStyle}
                            icon={(
                                <BiEdit fill="#fff" size={20} />
                            )}
                            onClick={toggleDisabled}
                        />
                    </div>
                </div>
                <div className="container--info teacher">
                    <div className="info-title">
                        <strong>Disciplinas</strong>
                    </div>
                    <div className="top-line"></div>
                    {disciplinesElements}
                </div>
            </div>
        </section>
    )
}

export default Teacher;