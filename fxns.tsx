export function formatString(str: string) {
    return str
        .replace(/['"]+/g, '')  // Remove any single or double quotes
        .replace(/_/g, ' ')      // Replace underscores with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
}