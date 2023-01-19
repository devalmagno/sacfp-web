export default function toCapitalize(text: string) {
    const capitalizedText = `${text[0].toUpperCase()}${text.substring(1)}`;

    return capitalizedText;
}