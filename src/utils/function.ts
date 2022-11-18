export function shortName(name: string) {
  return name
    .split(' ')
    .map(e => e[0])
    .join('');
}
