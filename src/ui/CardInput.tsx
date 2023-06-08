import { Dispatch, SetStateAction, useState } from 'react';
import { BiUser } from 'react-icons/bi';

import Button from './Button';

import '../styles/CardInput.scss';
import Input from './Input';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../services/firebaseConfig';

import { User } from '../types/DataTypes';

type CardInputProps = {
    users: User[];
    setUsers: Dispatch<SetStateAction<User[]>>;
}

function CardInput(props: CardInputProps) {
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');

    const [isAddingUser, setIsAddingUser] = useState(false);
    const userTypeList = [
        { type: "admin", shows: "admin", name: "Administrador" },
        { type: "external", shows: "admin", name: "Usuário Externo" },
    ];

    const usersCollection = collection(db, "users");

    const handlerUserType = (value: string) => {
        setUserType(value);
    }

    const cancelOperation = () => {
        setUserType('');
        setEmail('');
        setIsAddingUser(false);
    }

    const userTypeElements = userTypeList.map(e => {
        const isSelected = e.name === userType;

        return (
            <div
                className={userType === e.name ? "user-type selected" : "user-type"}
                key={e.type}
                onClick={() => { handlerUserType(e.name) }}
            >
                {e.name}
            </div>
        )
    });

    const addNewUser = async () => {
        if (userType === '' && email === '') return;
        const answer = window.confirm(`Tem certeza que deseja adicionar ${email} a sua lista de usuários?`);
        if (!answer) return;
        let type = '';
        switch (userType) {
            case userTypeList[0].name:
                type = 'admin';
                break;
            case userTypeList[1].name:
                type = 'external';
                break;
            default:
                type = 'external';
        }

        const { id } = await addDoc(usersCollection, {
            name: '',
            email: email.toLowerCase(),
            type,
        });

        const userList = props.users;
        userList.push({
            id,
            name: '',
            email: email.toLowerCase(),
            type
        });

        props.setUsers([...userList]);

        setIsAddingUser(false)
    }

    return (
        <div className="card-input--container">
            {!isAddingUser ? (
                <Button
                    icon={<BiUser fill="#fff" size={20} />}
                    title='Adicionar usuário'
                    style={{
                        gap: 8,
                        fontSize: 15,
                    }}
                    onClick={() => { setIsAddingUser(true) }}
                />
            ) : (
                <div className="form">
                    <div className="user-type--container">
                        {userTypeElements}
                    </div>
                    <Input
                        label='E-mail'
                        value={email}
                        setValue={setEmail}
                        isDisabled={false}
                    />

                    <div className="buttons">
                        <Button
                            title='cancelar'
                            style={{
                                background: 'transparent',
                                color: '#717171',
                                fontSize: 15,
                                boxShadow: 'none',
                            }}
                            onClick={cancelOperation}
                        />
                        <Button
                            title='adicionar usuário'
                            onClick={addNewUser}
                            style={{
                                fontSize: 15,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CardInput