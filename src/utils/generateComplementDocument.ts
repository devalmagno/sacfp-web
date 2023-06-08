import { EadInfo, TeacherPointSheet, ScheduleEad, EadSchoolDays, Calendar } from "../types/DataTypes";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from 'pizzip/utils/index';
import { saveAs } from 'file-saver';
import { getSchoolDaysList } from "./getSchoolDaysList";

interface Props {
    pointsheet: TeacherPointSheet;
    info: EadInfo[];
    departament: string;
    semester: string;
    calendar: Calendar;
    observation: string;
}

const loadFile = (url: string, callback: (err: Error, data: string) => void) => {
    PizZipUtils.getBinaryContent(url, callback);
}

const generateReplacementDocument = (props: Props) => {
    if (!props.pointsheet.sheet.schedules) return;

    const semesterNumber = props.semester.split('/')[0];
    const year = props.semester.split('/')[1];

    const workload = props.pointsheet.sheet.course === 'TUTORIA' ?
        '02' : `${props.pointsheet.sheet.workload}`;

    const schedules: ScheduleEad[] = [];
    props.info.forEach(e => {
        const classInfo = e.classTimes.map((time) => ({
            date: e.classDate,
            time: time.time,
        }));

        if (!schedules.some(e => classInfo.some(info => info === e)))
            schedules.push(...classInfo);
    });

    const eadSchoolDays: EadSchoolDays[] = getSchoolDaysList({
        calendar: props.calendar,
        schoolDays: schedules,
    }).map(e => {
        const sch = e.schedules.map(schedule => ({ ...schedule, description: '' }));
        return { ...e, schedules: sch };
    });

    loadFile(
        '/pointsheets/pointsheet_complement_model.docx',
        (error, content) => {
            if (error) throw error;

            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            doc.setData({
                course: props.pointsheet.sheet.course,
                semester: semesterNumber,
                year,
                name: props.pointsheet.name,
                masp: props.pointsheet.masp,
                discipline: props.pointsheet.sheet.discipline,
                period: props.pointsheet.sheet.period,
                workload,
                schoolDays: eadSchoolDays,
                departament: props.departament,
                observation: props.observation,
            });

            try {
                doc.render();
            } catch (e) {
                console.log(e);
            }

            const out = doc.getZip().generate({
                type: 'blob',
                MimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                compression: "DEFLATE",
            });
            saveAs(out, `COMPLEMENTO_${props.pointsheet.sheet.discipline}_${props.pointsheet.name}.docx`);
        }
    )
}

export default generateReplacementDocument;