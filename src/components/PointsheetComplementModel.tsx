import { BiMenu, BiMenuAltRight, BiRightArrowAlt, BiSpreadsheet, BiTrashAlt } from "react-icons/bi"
import { EadDate } from "../ui"

import '../styles/PointSheetInfo.scss';
import { useEffect, useState } from "react";
import { EadInfo, TeacherPointSheet } from "../types/DataTypes";
import { useDataContext, useRenderReplacementContext } from "../contexts";
import { generateComplementDocument, generateEadDocument } from "../utils";

type Props = {
    sheet: TeacherPointSheet;
}

function PointsheetComplementModel({ sheet }: Props) {
    const { eadInfo: complementInfo, setEadInfo: setComplementInfo, setType, type, observation, setObservation } = useRenderReplacementContext();

    const [showContent, setShowContent] = useState(false);

    const { config, semester, calendar } = useDataContext();

    const observationList = [
        "Complemento de carga horária.",
        "O professor ministrou as aulas, mas não assinou o ponto, sendo necessária a abertura de uma nova folha."
    ];

    const observationElements = observationList.map(elem => {
        const isSelected = observation === elem;

        return (
            <div
                onClick={() => setObservation(elem)}
                className={
                    isSelected ?
                        "selectable-box selected" :
                        "selectable-box"
                }
                style={{ fontSize: '14px' }}
                key={elem}
            >
                {elem}
            </div>
        );
    })

    const eadElements = complementInfo.map(elem => {
        const classTimes = elem.classTimes.filter(e => e.isSelected)
            .map(e => ` ${e.time}º`).toString().replaceAll(",", " ");

        return (
            <div className="container--replacement flex-row">
                <BiSpreadsheet fill="#717171" size={20} />
                <div
                    className="flex-column"
                    style={{
                        width: '12rem',
                    }}
                >
                    <strong>
                        {elem.classDate}
                    </strong>
                    <span>
                        {classTimes}
                    </span>
                </div>
                <div
                    className="remove--button"
                    onClick={() => removeEadItem(elem)}
                >
                    <BiTrashAlt fill="#717171" size={20} />
                </div>
            </div>
        );
    });

    const handlerShowContent = () => {
        setShowContent(prevState => !prevState);
        setType('COMPLEMENT');
    }

    const removeEadItem = (elem: EadInfo) => {
        const eadList = complementInfo.slice();
        const index = eadList.indexOf(elem);

        eadList.splice(index, 1);
        setComplementInfo(eadList);
    }

    const generatePointsheet = () => {
        const info = complementInfo.map(e => {
            const classTimes = e.classTimes.filter(time => time.isSelected);

            console.log(classTimes);

            return {
                ...e,
                classTimes    
            }
        });

        generateComplementDocument({
            info,
            pointsheet: sheet,
            departament: config.departament,
            semester,
            calendar,
            observation,
        });
    }

    useEffect(() => {
        const changeType = () => {
            if (showContent)
                setType(type);

            setComplementInfo([])
        }

        changeType()
    }, [showContent]);

    useEffect(() => {
        const handlerShowContent = () => {
            if (type !== 'COMPLEMENT') setShowContent(false);
        }

        handlerShowContent();
    }, [type])

    return (
        <div className="models--box">
            <div
                className="flex-row"
                style={{ justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={handlerShowContent}
            >
                <h3>Folha de Ponto COMPLEMENTO CH</h3>
                {!showContent ? (
                    <BiMenu fill="#333A56" size={24} />
                ) : (
                    <BiMenuAltRight fill="#333A56" size={24} />
                )}
            </div>
            <div className="flex-column" style={!showContent ? { display: 'none' } : {}}>
                <div className="flex-column">
                    <EadDate
                        eadInfo={complementInfo}
                        setEadInfo={setComplementInfo}
                        sheet={sheet}
                        type={'EAD'}
                    />
                    {eadElements}

                    <div className="observation--container">
                        <strong>Observação:</strong>

                        <div className="container--box">
                            {observationElements}
                        </div>
                    </div>

                    {complementInfo.length !== 0 ? (
                        <div className="models--button" onClick={generatePointsheet}>
                            <BiSpreadsheet fill="#333A56" size={16} />
                            <h3>Gerar Ponto Complemento</h3>
                            <BiRightArrowAlt fill="#333A56" size={16} />
                        </div>
                    ) : (
                        <div className="models--button button--disabled">
                            <BiSpreadsheet fill="#333A56" size={16} />
                            <h3>Gerar Ponto de Complemento</h3>
                            <BiRightArrowAlt fill="#333A56" size={16} />
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default PointsheetComplementModel