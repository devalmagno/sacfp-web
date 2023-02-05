export interface DateTypeInterface {
    type: string;
    title: string;
}

class DateType {
    type: string;
    title: string;

    constructor (type: string, title: string) {
        this.title = title;
        this.type = type;
    }
}

let dateTypeList: DateTypeInterface[] = [];
dateTypeList.push(new DateType('recess', 'recesso'));
dateTypeList.push(new DateType('holiday', 'feriado'));
dateTypeList.push(new DateType('school_saturday', 'sábado letivo'));
dateTypeList.push(new DateType('fepeg', 'fepeg'));
dateTypeList.push(new DateType('other', 'outro'));

export default dateTypeList;