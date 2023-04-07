import { BiLeftArrowAlt, BiRightArrowAlt, BiSpreadsheet } from 'react-icons/bi';

import { TeacherPointSheet } from '../types/DataTypes';

import { generateDocument } from '../utils';

import '../styles/PointSheetInfo.scss';

import PointsheetModels from './PointsheetModels';
import { useDataContext, useRenderReplacementContext } from '../contexts';
import { PointsheetEadModel } from '.';

type Props = {
    sheet: TeacherPointSheet;
    show: () => void;
}

function PointSheetInfo({ sheet, show }: Props) {
    const { calendar, semester } = useDataContext();
    const { setType, setIsPointsheetOpen } = useRenderReplacementContext();

    const schedules = sheet.sheet.schedules!.map(sch => {
        const { day, times } = sch;
        const formatedTimes = times.map(time => `${time}º`);

        const formatedSchedule = `${day.toUpperCase().substring(0, 3)}: ${formatedTimes} `;
        return formatedSchedule.substring(0, formatedSchedule.length);
    }).toString();

    const showNormalPointsheet = () => {
        setType('');
        setIsPointsheetOpen(true);
    }

    return (
        <div className='pointsheet-info--container'>
            <div className="go-back" onClick={show}>
                <BiLeftArrowAlt fill='#fff' />
                <span>Voltar para Pontos</span>
            </div>
            <h3>{sheet.name}</h3>
            <span>{sheet.masp}</span>
            <h3>Disciplina</h3>
            <span>{sheet.sheet.discipline}</span>
            <span>{sheet.sheet.period}º - {sheet.sheet.workload}h/a - {sheet.sheet.course}</span>
            <span>{schedules}</span>

            <div className="pointsheet-models">
                <div
                    className="models--button"
                    onClick={() => generateDocument({
                        calendar,
                        pointsheet: sheet,
                        save: true,
                        semester,
                    })}
                >
                    <BiSpreadsheet fill="#333A56" size={16} />
                    <h3>Gerar Folha de Ponto Normal</h3>
                    <BiRightArrowAlt fill="#333A56" size={16} />
                </div>

                <div
                    className="models--button"
                    onClick={showNormalPointsheet}
                >
                    <BiSpreadsheet fill="#333A56" size={16} />
                    <h3>Visualizar Folha de Ponto Normal</h3>
                    <BiRightArrowAlt fill="#333A56" size={16} />
                </div>

                <PointsheetModels
                    sheet={sheet}
                    type='Anteposição'
                />

                <PointsheetModels
                    sheet={sheet}
                    type='Reposição'
                />

                <PointsheetEadModel
                    sheet={sheet}
                />
            </div>
        </div>
    )
}

export default PointSheetInfo
