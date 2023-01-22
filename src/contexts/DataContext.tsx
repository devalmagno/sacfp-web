import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";

import { Teacher } from '../types/DataTypes';

import { db } from "../services/firebaseConfig";

type dataContext = {
    teachers: Teacher[];
    setTeachers: Dispatch<SetStateAction<Teacher[]>>;
}

type Props = {
    children: ReactNode;
}

const DataContext = createContext<dataContext | null>(null);

export const useDataContext = () => {
    const dataContext = useContext(DataContext);

    if (!dataContext)
        throw new Error(
            "dataContext has to be used within <DataContext.Provider>"
        );

    return dataContext;
}

export function DataContextComponent(props: Props) {
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const teachersCollectionRef = collection(db, "teachers");

    useEffect(() => {
        const getTeachers = async () => {
            const data = await getDocs(teachersCollectionRef);
            const teachersArray = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as Teacher));
            setTeachers(teachersArray);
        }

        getTeachers();
    }, []);

    return (
        <DataContext.Provider
            value={{
                teachers,
                setTeachers
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}