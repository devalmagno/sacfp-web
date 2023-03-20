import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../contexts';

import { FcGoogle } from 'react-icons/fc';

import '../styles/Login.scss';

function Login() {
    const { authUser, login } = useAuthContext();

    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        login();
    }

    useEffect(() => {

        if (authUser !== null) navigate('/');

        document.title = 'SGCFP - Fazer Acesso';
    }, []);

    useEffect(() => {

        if (authUser !== null) navigate('/');
    }, [authUser]);

    return (
        <div className="container--login">
            <h3 className="logo">
                Sistema de Gestão e Criação de Folhas de Ponto
            </h3>

            <button onClick={handleGoogleLogin}>
                <div className="google-icon">
                    <FcGoogle fill='#fff' />
                </div>
                <span>Entrar com o Google</span>
            </button>
            <div></div>
        </div>
    )
}

export default Login