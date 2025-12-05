export function capitalize(str: string) {
  const words = str.split(" ");
  let capitalizedWord = "";

  for (const [index, word] of words.entries()) {
    if (word.length <= 2 && index != 0) {
      capitalizedWord += word.toLowerCase() + " ";
      continue;
    }

    capitalizedWord +=
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + " ";
  }

  return capitalizedWord.trim();
}
