import toCapitalize, { toCapitalizeFirstLetters } from "./toCapitalize";
import alphabeticalSort, { ascDateSort, ascTimeSort, sortNumericalRising } from "./alphabeticalSort";
import arrayRange from "./arrayRange";
import {
    convertStringToDate,
    convertDateToString,
    isValidDate,
    getMonthName,
    getDayName,
    convertDayNameEnUSToPtBR
} from "./handlerDate";
import getDates from "./getDates";
import generateDocument from "./generateDocument";
import generateReplacementDocument from "./generateReplacementDocument";
import generateEadDocument from "./generateEadDocument";
import { getSchoolDaysList } from './getSchoolDaysList';

export {
    toCapitalize,
    toCapitalizeFirstLetters,
    alphabeticalSort,
    arrayRange,
    convertStringToDate,
    convertDateToString,
    isValidDate,
    getMonthName,
    getDates,
    generateDocument,
    getDayName,
    sortNumericalRising,
    generateReplacementDocument,
    convertDayNameEnUSToPtBR,
    getSchoolDaysList,
    generateEadDocument
};
