import { AiOutlineGithub } from 'react-icons/ai';

import { useDataContext } from "../contexts"
import { toCapitalizeFirstLetters } from "../utils";

import '../styles/Footer.scss';

function Footer() {
    const { config } = useDataContext();

    return (
        <div className="footer--container">
            <strong>Departamento de {toCapitalizeFirstLetters(config.departament)}©</strong>
            <a href="https://github.com/devalmagno" target="_blank">
                <AiOutlineGithub fill="#fff" />
                <span>
                    Github
                </span>
            </a>
        </div>
    )
}

export default Footer