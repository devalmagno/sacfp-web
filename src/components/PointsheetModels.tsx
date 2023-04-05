import { BiMenu, BiMenuAltRight, BiRightArrowAlt, BiSpreadsheet, BiTrashAlt } from "react-icons/bi"
import { ReplacementDate } from "../ui"

import '../styles/PointSheetInfo.scss';
import { useEffect, useState } from "react";
import { ReplacementInfo, TeacherPointSheet } from "../types/DataTypes";
import { useDataContext, useRenderReplacementContext } from "../contexts";
import { generateReplacementDocument } from "../utils";

type Props = {
    sheet: TeacherPointSheet;
    type: string;
}

function PointsheetModels({ sheet, type }: Props) {
    const { config, semester } = useDataContext();

    const { replacementInfo, setReplacementInfo, setType, type: contextType } = useRenderReplacementContext();

    const [showContent, setShowContent] = useState(false);

    const replacementElements = replacementInfo.map(elem => {
        const classTimes = elem.classTimes.filter(e => e.isSelected)
            .map(e => ` ${e.time}º`).toString().replaceAll(",", " ");
        const replacementTimes = elem.replacementTimes.filter(e => e.isSelected)
            .map(e => ` ${e.time}º`).toString().replaceAll(",", " ");

        return (
            <div className="container--replacement flex-row">
                <BiSpreadsheet fill="#717171" size={20} />
                <div className="flex-column">
                    <strong>
                        {elem.classDate}
                    </strong>
                    <span>
                        {classTimes}
                    </span>
                </div>
                <div className="flex-column">
                    <strong>
                        {elem.replacementDate}
                    </strong>
                    <span>
                        {replacementTimes}
                    </span>
                </div>
                <div
                    className="remove--button"
                    onClick={() => removeReplacement(elem)}
                >
                    <BiTrashAlt fill="#717171" size={20} />
                </div>
            </div>
        );
    });

    const removeReplacement = (elem: ReplacementInfo) => {
        const replacementList = replacementInfo.slice();
        const index = replacementList.indexOf(elem);

        replacementList.splice(index, 1);
        setReplacementInfo(replacementList);
    }

    const generatePointsheet = () => {
        const formatedReplacementInfo = replacementInfo.map(replacement => {
            const classTimes = replacement.classTimes.filter(e => e.isSelected);
            const replacementTimes = replacement.replacementTimes.filter(e => e.isSelected);

            return {
                ...replacement,
                classTimes,
                replacementTimes
            }
        });

        generateReplacementDocument({
            replacementInfo: formatedReplacementInfo,
            pointsheet: sheet,
            pointsheetType: type,
            departament: config.departament,
            semester
        });
    }

    useEffect(() => {
        const changeType = () => {
            if (showContent)
                setType(type);

            setReplacementInfo([])
        }

        changeType()
    }, [showContent]);

    useEffect(() => {
        const handlerShowContent = () => {
            if (type !== contextType) setShowContent(false);
        }

        handlerShowContent();
    }, [contextType])

    return (
        <div className="models--box">
            <div
                className="flex-row"
                style={{ justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => setShowContent(prevState => !prevState)}
            >
                <h3>Folha de Ponto {type}</h3>
                {!showContent ? (
                    <BiMenu fill="#333A56" size={24} />
                ) : (
                    <BiMenuAltRight fill="#333A56" size={24} />
                )}
            </div>
            <div className="flex-column" style={!showContent ? { display: 'none' } : {}}>
                <div className="flex-column">
                    <ReplacementDate
                        replacementInfo={replacementInfo}
                        setReplacementInfo={setReplacementInfo}
                        sheet={sheet}
                        type={type}
                    />
                    {replacementElements}
                    {replacementInfo.length !== 0 ? (
                        <div className="models--button" onClick={generatePointsheet}>
                            <BiSpreadsheet fill="#333A56" size={16} />
                            <h3>Gerar Ponto de {type}</h3>
                            <BiRightArrowAlt fill="#333A56" size={16} />
                        </div>
                    ) : (
                        <div className="models--button button--disabled">
                            <BiSpreadsheet fill="#333A56" size={16} />
                            <h3>Gerar Ponto de {type}</h3>
                            <BiRightArrowAlt fill="#333A56" size={16} />
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default PointsheetModels