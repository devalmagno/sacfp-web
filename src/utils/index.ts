import toCapitalize, { toCapitalizeFirstLetters } from "./toCapitalize";
import alphabeticalSort, { ascDateSort, ascTimeSort, sortNumericalRising } from "./alphabeticalSort";
import arrayRange from "./arrayRange";
import {
    convertStringToDate,
    convertDateToString,
    isValidDate,
    getDayName,
    convertDayNameEnUSToPtBR
} from "./handlerDate";
import getDates from "./getDates";
import generateDocument from "./generateDocument";
import generateReplacementDocument from "./generateReplacementDocument";
import generateEadDocument from "./generateEadDocument";
import generateComplementDocument from "./generateComplementDocument";
import { getSchoolDaysList } from './getSchoolDaysList';
import { getMonthName } from './getMonthName';

export {
    toCapitalize,
    toCapitalizeFirstLetters,
    alphabeticalSort,
    arrayRange,
    convertStringToDate,
    convertDateToString,
    isValidDate,
    getDates,
    generateDocument,
    getDayName,
    sortNumericalRising,
    generateReplacementDocument,
    convertDayNameEnUSToPtBR,
    getSchoolDaysList,
    generateEadDocument,
    getMonthName,
    generateComplementDocument
};
