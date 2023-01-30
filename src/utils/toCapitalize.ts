export default function toCapitalize(text: string) {
    const lowerCaseText = text.toLowerCase();
    const capitalizedText = `${lowerCaseText[0].toUpperCase()}${lowerCaseText.substring(1)}`;

    return capitalizedText;
}