export function shortName(name: string) {
  return name
    .split(' ')
    .map(e => {
      const letter = e[0].toUpperCase();
      const char = letter.charCodeAt(0);
      if (char >= 65 && char <= 90) return letter;
    })
    .join('');
}
