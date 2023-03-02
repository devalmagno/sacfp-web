import { Calendar, TeacherPointSheet } from "../types/DataTypes";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from 'pizzip/utils/index';
import { saveAs } from 'file-saver';

import { getDates } from "../utils";
import { useDataContext } from "../contexts";

type Props = {
  pointsheet: TeacherPointSheet;
  calendar: Calendar;
}

function DocViewer(props: Props) {
  const { semester } = useDataContext();
  const semesterNumber = semester.split('/')[0];
  const year = semester.split('/')[1];

  if (!props.pointsheet.sheet.schedules) return <></>;

  const schoolDays = getDates({ calendar: props.calendar, schedules: props.pointsheet.sheet.schedules, workload: props.pointsheet.sheet.workload });

  const loadFile = (url: string, callback: (err: Error, data: string) => void) => {
    PizZipUtils.getBinaryContent(url, callback);
  }

  const generateDocument = () => {
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
          workload: props.pointsheet.sheet.workload,
          schoolDays,
        });

        try {
          doc.render();
        } catch (e) {
          console.log(e);
        }

        const out = doc.getZip().generate({
          type: 'blob',
          MimeType:  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        saveAs(out, `${props.pointsheet.sheet.discipline}_${props.pointsheet.name}.docx`);
      }
    )
  }

  generateDocument();

  return (
    <div>DocViewer</div>
  )
}

export default DocViewer