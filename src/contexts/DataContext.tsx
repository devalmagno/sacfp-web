import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";

import { Calendar, Config, Teacher } from '../types/DataTypes';

import { db } from "../services/firebaseConfig";

type dataContext = {
    semester: string;
    setSemester: Dispatch<SetStateAction<string>>;

    teachers: Teacher[];
    setTeachers: Dispatch<SetStateAction<Teacher[]>>;

    calendar: Calendar;
    setCalendar: Dispatch<SetStateAction<Calendar>>;

    calendarList: Calendar[];
    setCalendarList: Dispatch<SetStateAction<Calendar[]>>;

    config: Config;
    setConfig: Dispatch<SetStateAction<Config>>;

    courseList: string[];
    setCourseList: Dispatch<SetStateAction<string[]>>;
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

    const [config, setConfig] = useState<Config>({
        id: '',
        departament: '',
    });

    const [courseList, setCourseList] = useState<string[]>([]);

    const teachersCollectionRef = collection(db, "teachers");
    const calendarCollectionRef = collection(db, "semesters");
    const configCollectionRef = collection(db, "config");

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

        const getConfig = async () => {
            const data = await getDocs(configCollectionRef);
            const configList = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as Config));
            setConfig(configList[0]);
        }

        getTeachers();
        getCalendarList();
        getConfig();
    }, []);

    useEffect(() => {
        const getCourseList = () => {
            let teacherCourses: string[] = [];
            teachers.forEach(teacher => {
                teacher.pointsheets?.forEach(sheet => {
                    if (!teacherCourses.some(e => e === sheet.course) && sheet.course !== 'TESTE' && sheet.course.toLowerCase() !== 'tutoria')
                        teacherCourses.push(sheet.course);
                });
            });

            setCourseList(teacherCourses);
        }


        getCourseList();
    }, [teachers])

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
                config,
                setConfig,
                calendarList,
                setCalendarList,
                courseList,
                setCourseList
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}