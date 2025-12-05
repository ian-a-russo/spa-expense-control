export function limitCharacters(str: string, max: number = 150) {
  if (str.length > max) return `${str.slice(0, max - 3)}...`;
  return str;
}
