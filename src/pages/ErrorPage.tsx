import { useRouteError, useNavigate } from "react-router-dom";

import '../styles/ErrorPage.scss';
import { useEffect } from "react";

function ErrorPage() {
    const error: any = useRouteError();
    const navigate = useNavigate();

    useEffect(() => {
        const handlerNavigation = () => {
            navigate('/');
        }

        handlerNavigation();
    }, []);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Desculpe, parece que ocorreu um erro inesperado.</p>
            <p>Vamos te redirecionar para a Tela Inicial...</p>
            <p>
                <i>{error.statusTExt || error.message}</i>
            </p>
        </div>
    )
}

export default ErrorPage