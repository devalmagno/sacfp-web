import { BiMenu, BiMenuAltRight, BiRightArrowAlt, BiSpreadsheet, BiTrashAlt } from "react-icons/bi"
import { EadDate } from "../ui"

import '../styles/PointSheetInfo.scss';
import { useEffect, useState } from "react";
import { EadInfo, TeacherPointSheet } from "../types/DataTypes";
import { useDataContext, useRenderReplacementContext } from "../contexts";
import { generateEadDocument } from "../utils";

type Props = {
    sheet: TeacherPointSheet;
}

function PointsheetModels({ sheet }: Props) {
    const { eadInfo, setEadInfo, setType, type, setIsPointsheetOpen } = useRenderReplacementContext();

    const [showContent, setShowContent] = useState(false);

    const { config, semester, calendar } = useDataContext();

    const eadElements = eadInfo.map(elem => {
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
        setType('EAD');
    }

    const removeEadItem = (elem: EadInfo) => {
        const eadList = eadInfo.slice();
        const index = eadList.indexOf(elem);

        eadList.splice(index, 1);
        setEadInfo(eadList);
    }

    const generatePointsheet = () => {
        const formatedEadInfo = eadInfo.map(info => {
            const classTimes = info.classTimes.filter(e => e.isSelected)

            return {
                ...info,
                classTimes
            }
        });

        generateEadDocument({
            eadInfo: formatedEadInfo,
            pointsheet: sheet,
            departament: config.departament,
            semester,
            calendar
        });
    }

    useEffect(() => {
        const changeType = () => {
            if (showContent)
                setType(type);

            setEadInfo([])
        }

        changeType()
    }, [showContent]);

    useEffect(() => {
        const handlerShowContent = () => {
            if (type !== 'EAD') setShowContent(false);
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
                <h3>Folha de Ponto EAD</h3>
                {!showContent ? (
                    <BiMenu fill="#333A56" size={24} />
                ) : (
                    <BiMenuAltRight fill="#333A56" size={24} />
                )}
            </div>
            <div className="flex-column" style={!showContent ? { display: 'none' } : {}}>
                <div className="flex-column">
                    <EadDate
                        eadInfo={eadInfo}
                        setEadInfo={setEadInfo}
                        sheet={sheet}
                        type={'EAD'}
                    />
                    {eadElements}
                    {eadInfo.length !== 0 ? (
                        <div className="models--button" onClick={generatePointsheet}>
                            <BiSpreadsheet fill="#333A56" size={16} />
                            <h3>Gerar Ponto EAD</h3>
                            <BiRightArrowAlt fill="#333A56" size={16} />
                        </div>
                    ) : (
                        <div className="models--button button--disabled">
                            <BiSpreadsheet fill="#333A56" size={16} />
                            <h3>Gerar Ponto EAD</h3>
                            <BiRightArrowAlt fill="#333A56" size={16} />
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default PointsheetModels