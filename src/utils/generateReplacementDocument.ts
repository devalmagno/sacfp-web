import { Calendar, ReplacementInfo, ScheduleReplacement, TeacherPointSheet } from "../types/DataTypes";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from 'pizzip/utils/index';
import { saveAs } from 'file-saver';

interface Props {
    pointsheet: TeacherPointSheet;
    replacementInfo: ReplacementInfo[];
    pointsheetType: string;
    departament: string;
    semester: string;
    calendar: Calendar;
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

    const pointsheetType = props.pointsheetType.toUpperCase();

    const schedules: ScheduleReplacement[] = [];
    props.replacementInfo.forEach(e => {
        const description = props.calendar.activity_dates.some(date => date.date === e.replacementDate) ?
            props.calendar.activity_dates.find(date => date.date === e.replacementDate)?.description :
            '';

        const classInfo: ScheduleReplacement[] = e.classTimes.map((time, index) => ({
            classDate: e.classDate,
            classTime: time.time,
            replacementDate: e.replacementDate,
            replacementTime: e.replacementTimes[index].time,
            description,
        }));

        if (!schedules.some(e => classInfo.some(info => info === e)))
            schedules.push(...classInfo);
    })

    loadFile(
        '/pointsheets/pointsheet_replacement_model.docx',
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
                schedules,
                departament: props.departament,
                pointsheetType
            });

            try {
                doc.render();
            } catch (e) {
                console.log(e);
            }

            const out = doc.getZip().generate({
                type: 'blob',
                MimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            saveAs(out, `${pointsheetType}_${props.pointsheet.sheet.discipline}_${props.pointsheet.name}.docx`);
        }
    )
}

export default generateReplacementDocument;