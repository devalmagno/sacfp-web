import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithCredential, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, getDocs, updateDoc } from '@firebase/firestore';

import { auth, db } from '../services/firebaseConfig';

import { User as UserType } from '../types/DataTypes';

interface AuthContextType {
    authUser: User | null;
    userIsEnabled: boolean;
    userList: UserType[];
    setUserList: Dispatch<SetStateAction<UserType[]>>;
    login: () => void;
    logout: () => void;
}

type Props = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
    const authContext = useContext(AuthContext);

    if (!authContext)
        throw new Error(
            "AuthContext has to be used within <AuthContext.Provider>"
        );

    return authContext;
}

const AuthProvider = (props: Props) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [userIsEnabled, setUserIsEnabled] = useState(false);
    const [userList, setUserList] = useState<UserType[]>([]);

    const usersCollectionRef = collection(db, "users");

    const login = async () => {

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            setAuthUser(result.user);

            if (userList.length > 0 && userList.some(e => e.email === result.user.email)) {
                setUserIsEnabled(true);

                const user = userList.find(e => e.email === result.user.email);
                if (user?.name === '') {
                    const userDoc = doc(db, "users", user!.id);

                    const updatedUser = {
                        ...user,
                        name: result.user.displayName,
                    };

                    await updateDoc(userDoc, updatedUser);
                }
            }
            else logout();
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        // lógica de logout
        signOut(auth).then(() => {
            console.log('sign out sucessful');
        }).catch(err => console.log)

        setUserIsEnabled(false);
    };

    useEffect(() => {

        const getUserList = async () => {
            const data = await getDocs(usersCollectionRef);
            const usersArray = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as UserType));
            setUserList(usersArray);
        }

        const listen = onAuthStateChanged(auth, user => {
            if (user) {
                    setAuthUser(user);
                    setUserIsEnabled(true);
            }
            else setAuthUser(null);
        });

        getUserList();
        listen();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, userIsEnabled, userList, setUserList, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };