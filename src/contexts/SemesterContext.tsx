import  React, { ReactNode, createContext, useContext, useState } from "react";

type semesterContext = {
    semester: string;
    setSemester: (string: string) => void;
}

type SemesterProps = {
    children: ReactNode;
}

const SemesterContext = createContext<semesterContext | null>(null);

export const useSemesterContext = () => {
    const semesterContext = useContext(SemesterContext);

    if (!semesterContext)
        throw new Error(
            "semesterContext has to be used within <SemesterContext.Provider>"
        );

    return semesterContext;
}

export function SemesterContextComponent(props: SemesterProps) {
    const [semester, setSemester] = useState("01/2023");

    return (
        <SemesterContext.Provider 
            value={{
                semester,
                setSemester
            }}
        >
            {props.children}
        </SemesterContext.Provider>
    )
}