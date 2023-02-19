import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiEdit, BiPlusCircle, BiSave, BiXCircle } from 'react-icons/bi';

import { Button, Input, SavedPopUp } from '../ui';

import { Teacher } from '../types/DataTypes';

import '../styles/Teacher.scss';
import { SheetRow, AddSheetRow } from '../components';
import { toCapitalize } from '../utils';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useDataContext } from '../contexts';


function AddTeacher() {
    const { setTeachers, semester } = useDataContext();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [masp, setMasp] = useState('');
    const [teacher, setTeacher] = useState<Teacher>({
        masp,
        name,
        pointsheets: [],
        id: ''
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [addDiscipline, setAddDiscipline] = useState(false);

    const [showSucessPopUp, setShowSucessPopUp] = useState(false);

    const teachersCollectionRef = collection(db, "teachers");

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

    const addNewTeacher = async () => {
        event?.preventDefault();
        const { id } = await addDoc(teachersCollectionRef, {
            ...teacher,
            name,
            masp,
        });

        setTeacher({
            ...teacher,
            masp,
            name,
            id
        });

        setTeachers(_prevState => {
            const teacherList = _prevState;
            teacherList.push({
                id,
                masp,
                name,
                pointsheets: [],
            });

            return teacherList;
        });

        navigate(`../spreadsheets/${id}`, {
            state: {
                teacher: {
                    id,
                    name,
                    masp,
                    pointsheets: [],
                },
            }
        });

    }

    return (
        <section>
            <div className="container--teacher">
                <span>
                    <Link to='/spreadsheets'>
                        {`> `}Dados
                    </Link>
                    {' / Novo professor'}
                </span>
                <div className="container--info teacher">
                    <div className="info-title">
                        <strong>Professor</strong>
                    </div>
                    <div className="top-line"></div>
                    <form className="info--row" onSubmit={addNewTeacher}>
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
                                submit={true}
                            />
                        )}
                    </form>
                </div>
            </div>
            <SavedPopUp
                setShow={setShowSucessPopUp}
                show={showSucessPopUp}
            />
        </section>
    )
}

export default AddTeacher;