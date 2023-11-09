import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from 'pizzip/utils/index';
import { saveAs } from 'file-saver';

import { getDates } from "../utils";

import { Calendar, TeacherPointSheet } from "../types/DataTypes";

interface Props {
    pointsheet: TeacherPointSheet;
    calendar: Calendar;
    semester: string;
    save: boolean;
}

const loadFile = (url: string, callback: (err: Error, data: string) => void) => {
    PizZipUtils.getBinaryContent(url, callback);
}

const generateDocument = (props: Props) => {
    if (!props.pointsheet.sheet.schedules) return;
    const schoolDays = getDates({ calendar: props.calendar, schedules: props.pointsheet.sheet.schedules, workload: props.pointsheet.sheet.workload });
    const semesterNumber = props.semester.split('/')[0];
    const year = props.semester.split('/')[1];

    let number = 0;

    schoolDays.forEach(e => number += e.schedules.length);

    const workload = props.pointsheet.sheet.course === 'TUTORIA' ?
        '02' : `${props.pointsheet.sheet.workload}`;

    loadFile(
        '/pointsheets/pointsheet_model.docx',
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
                schoolDays,
            });

            try {
                doc.render();
            } catch (e) {
                console.log(e);
            }

            const out = doc.getZip().generate({
                type: 'blob',
                // MimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                compression: "DEFLATE",
            });

            if (props.save)
                saveAs(out, `${props.pointsheet.sheet.discipline}_${props.pointsheet.name}.docx`);
            // else {
            //     const storageRef = ref(storage, 'documents/pointsheet');
            //     uploadBytes(storageRef, out);
            // }
        }
    )
}

export default generateDocument;