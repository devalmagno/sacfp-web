import { GoogleAuthProvider, User, onAuthStateChanged, signInWithCredential, signInWithPopup, signOut } from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { auth } from '../services/firebaseConfig';

interface AuthContextType {
    authUser: User | null;
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

    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS.split(',');
    const userEmails = import.meta.env.VITE_USER_EMAILS.split(',');

    const enabledEmails: string[] = [
        ...adminEmails,
        ...userEmails
    ];
    const authToken = localStorage.getItem('authToken');

    const login = async () => {

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            if (enabledEmails.some(e => e === result.user.email))
                setAuthUser(result.user);
            // else logout();
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        // lógica de logout
        signOut(auth).then(() => {
            console.log('sign out sucessful');
        }).catch(err => console.log)
    };

    useEffect(() => {

        const signInWithGoogleCredential = async () => {
            if (authToken) {
                const credential = GoogleAuthProvider.credential(authToken);

                signInWithCredential(auth, credential)
                    .then(e => console.log('Succesful login'))
                    .catch(err => console.log('Firebase Access Token Error'));
            }
        }

        const listen = onAuthStateChanged(auth, user => {
            if (user) {
                if (enabledEmails.some(e => e === user.email)) {
                    setAuthUser(user);
                    user.getIdToken()
                        .then(idToken => {
                            localStorage.setItem('authToken', idToken);
                        });
                } else user.delete();
            }
            else setAuthUser(null);
        });

        return () => {
            signInWithGoogleCredential();
            listen();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };