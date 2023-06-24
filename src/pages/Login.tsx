import { useAuthContext } from '../contexts';

import { FcGoogle } from 'react-icons/fc';

import '../styles/Login.scss';

function Login() {
    const { login } = useAuthContext();


    const handleGoogleLogin = () => {
        login();
    }

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