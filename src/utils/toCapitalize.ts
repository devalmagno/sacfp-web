export default function toCapitalize(text: string) {
    if (text === '') return '';
    const lowerCaseText = text.toLowerCase();
    const capitalizedText = `${lowerCaseText[0].toUpperCase()}${lowerCaseText.substring(1)}`;

    return capitalizedText;
}

export function toCapitalizeFirstLetters(text: string) {
    let finalText = '';
    text
        .split(' ')
        .forEach(txt => {
            finalText += `${toCapitalize(txt)} `;
        });

    return finalText;
}