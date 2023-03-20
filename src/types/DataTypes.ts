export type Teacher = {
  id: string;
  name: string;
  masp: string;
  pointsheets?: Pointsheet[];
}

export type TeacherPointSheet = {
  id: string;
  name: string;
  masp: string;
  sheet: Pointsheet;
}

export type Pointsheet = {
  course: string;
  course_code: string;
  period: string;
  discipline: string;
  workload: number;
  schedules?: Schedules[];
  semester?: string;
}

export type Schedules = {
  day: string;
  times: number[]
}

export type Calendar = {
  id: string;
  semester: string;
  end_date: string;
  start_date: string; 
  activity_dates: Activity_dates[];
  acronym: string;
}

export type Activity_dates = {
  date: string;
  description: string;
  reference_day: string;
  type: string;
}

export type Config = {
  id: string;
  departament: string;
}

export type ReplacementInfo = {
    classDate: string;
    classTimes: ClassTimesProps[];
    replacementDate: string;
    replacementTimes: ClassTimesProps[];
}

export type ClassTimesProps = {
    time: number;
    isSelected: boolean;
}