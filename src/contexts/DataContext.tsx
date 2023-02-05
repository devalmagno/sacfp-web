import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";

import { Calendar, Teacher } from '../types/DataTypes';

import { db } from "../services/firebaseConfig";

type dataContext = {
    semester: string;
    setSemester: Dispatch<SetStateAction<string>>;

    teachers: Teacher[];
    setTeachers: Dispatch<SetStateAction<Teacher[]>>;

    calendar: Calendar;
    setCalendar: Dispatch<SetStateAction<Calendar>>;
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
    const [calendarList, setCalendarList] = useState<Calendar[]>([]);

    const [semester, setSemester] = useState("01/2023");
    const [calendar, setCalendar] = useState<Calendar>(calendarList[0]);

    const teachersCollectionRef = collection(db, "teachers");
    const calendarCollectionRef = collection(db, "semesters");

    useEffect(() => {
        const getTeachers = async () => {
            const data = await getDocs(teachersCollectionRef);
            const teachersArray = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as Teacher));
            setTeachers(teachersArray);
        }

        const getCalendarList = async () => {
            const data = await getDocs(calendarCollectionRef);
            const calendarsArray = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as Calendar));
            setCalendarList(calendarsArray);
        }

        console.log('fazendo fetch 1')

        getTeachers();
        getCalendarList();
    }, []);

    useEffect(() => {
        const currentCalendar = calendarList.filter(calendar => calendar.semester === semester);
        setCalendar(currentCalendar[0])
    }, [calendarList, semester]);

    return (
        <DataContext.Provider
            value={{
                teachers,
                setTeachers,
                calendar,
                setCalendar,
                semester,
                setSemester,
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}