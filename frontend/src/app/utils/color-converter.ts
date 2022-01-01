export function backgroundColorFromString(string: string) {
  const stringHash = [...string].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringHash % 360}, 100%, 50%)`;
}
