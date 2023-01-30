import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit, BiPlusCircle, BiSave, BiXCircle } from 'react-icons/bi';

import { Button, Input, SavedPopUp } from '../ui';

import { Teacher as TeacherType } from '../types/DataTypes';

import '../styles/Teacher.scss';
import { SheetRow, AddSheetRow } from '../components';
import { toCapitalize } from '../utils';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../services/firebaseConfig';

function Teacher() {
    const route = useLocation();
    const teacherProp: TeacherType = route.state.teacher;
    const [teacher, setTeacher] = useState(teacherProp);
    const [name, setName] = useState(teacher.name);
    const [masp, setMasp] = useState(teacher.masp);

    const [isDisabled, setIsDisabled] = useState(true);
    const [addDiscipline, setAddDiscipline] = useState(false);

    const [showSucessPopUp, setShowSucessPopUp] = useState(false);

    const toggleDisabled = () => {
        event?.preventDefault();
        setIsDisabled(_prevState => !_prevState);
    }

    const toggleAddDiscipline = () => {
        setAddDiscipline(_prevState => !_prevState);
    }

    const buttonStyle = {
        width: 120,
        marginLeft: 10
    }

    const disciplinesElements = teacher.pointsheets.map(sheet => (
        <SheetRow
            key={sheet.discipline}
            sheet={sheet}
            teacher={teacher}
            setTeacher={setTeacher}
        />
    ));

    const updateTeacher = async () => {
        event?.preventDefault();

        if (name === teacher.name && masp === teacher.masp || !teacher.id) {
            toggleDisabled();
            return;
        }

        const teacherDoc = doc(db, "teachers", teacher.id);
        const updatedTeacher = {
            ...teacher,
            name,
            masp,
        };

        await updateDoc(teacherDoc, updatedTeacher);
        setTeacher(updatedTeacher);
        toggleDisabled();
        setShowSucessPopUp(true);
    }

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
                    <form className="info--row" onSubmit={updateTeacher}>
                        <Input
                            label='Nome'
                            value={name}
                            setValue={setName}
                            width={480}
                            isDisabled={isDisabled}
                        />
                        <Input
                            label='masp'
                            value={masp}
                            width={160}
                            isDisabled={isDisabled}
                            setValue={setMasp}
                        />
                        {isDisabled ? (
                            <Button
                                title='Editar'
                                style={buttonStyle}
                                icon={(
                                    <BiEdit fill="#fff" size={20} />
                                )}
                                onClick={toggleDisabled}
                            />
                        ) : (
                            <Button
                                title='Salvar'
                                style={buttonStyle}
                                icon={(
                                    <BiSave fill="#fff" size={20} />
                                )}
                                onClick={updateTeacher}
                                submit={true}
                            />
                        )}
                    </form>
                </div>
                <div className="container--info teacher">
                    <div className="info-title">
                        <strong>Disciplinas</strong>
                    </div>
                    <div className="top-line"></div>
                    <div
                        className="add-discipline"
                        onClick={toggleAddDiscipline}
                    >
                        {addDiscipline ? (
                            <>
                                <BiXCircle fill="#fff" size={20} />
                                <div className="tooltip">{toCapitalize('cancelar')}</div>
                            </>
                        ) : (
                            <>
                                <BiPlusCircle fill="#fff" size={20} />
                                <div className="tooltip">{toCapitalize('Adicionar Disciplina')}</div>
                            </>
                        )}
                    </div>
                    {addDiscipline && <AddSheetRow
                        teacher={teacher}
                        setShow={toggleAddDiscipline}
                    />}
                    {disciplinesElements}
                </div>
            </div>
            <SavedPopUp
                setShow={setShowSucessPopUp}
                show={showSucessPopUp}
            />
        </section>
    )
}

export default Teacher;