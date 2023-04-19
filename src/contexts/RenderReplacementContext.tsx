import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState
} from "react";

import { EadInfo, ReplacementInfo } from '../types/DataTypes';


type RenderReplacementContextType = {
    replacementInfo: ReplacementInfo[];
    setReplacementInfo: Dispatch<SetStateAction<ReplacementInfo[]>>;

    eadInfo: EadInfo[];
    setEadInfo: Dispatch<SetStateAction<EadInfo[]>>;

    type: string;
    setType: Dispatch<SetStateAction<string>>;

    isPointsheetOpen: boolean;
    setIsPointsheetOpen: Dispatch<SetStateAction<boolean>>;

    observation: string;
    setObservation: Dispatch<SetStateAction<string>>;
}

type Props = {
    children: ReactNode;
}

const RenderReplacementContext = createContext<RenderReplacementContextType | null>(null);

export const useRenderReplacementContext = () => {
    const renderReplacementContext = useContext(RenderReplacementContext);

    if (!renderReplacementContext)
        throw new Error(
            "renderReplacementContext has to be used within <RenderReplacementContext.Provider>"
        );

    return renderReplacementContext;
}

export function RenderReplacementContextComponent(props: Props) {
    const [replacementInfo, setReplacementInfo] = useState<ReplacementInfo[]>([]);
    const [eadInfo, setEadInfo] = useState<EadInfo[]>([]);
    const [type, setType] = useState('');
    const [isPointsheetOpen, setIsPointsheetOpen] = useState(false);
    const [observation, setObservation] = useState(
        "Complemento de carga horária."
    );

    return (
        <RenderReplacementContext.Provider
            value={{
                replacementInfo,
                setReplacementInfo,
                type,
                setType,
                eadInfo,
                setEadInfo,
                isPointsheetOpen,
                setIsPointsheetOpen,
                observation,
                setObservation
            }}
        >
            {props.children}
        </RenderReplacementContext.Provider>
    )
}