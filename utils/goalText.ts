export function parseLines(lines: string[]): string[] {
  const trimLines = lines.map(el => el.trim());
  const len = trimLines.length;
  const lastLine = trimLines[len - 1];

  if (lastLine === '지') {
    trimLines[len - 2] = trimLines[len - 2].substring(
      0,
      trimLines[len - 2].length - 1,
    );
    trimLines[len - 1] = '';
  } else {
    trimLines[len - 1] = lastLine.substring(0, lastLine.length - 2);
  }

  const firstLine = trimLines[0].split(' ');
  firstLine.shift();
  trimLines[0] = firstLine.join(' ');

  return trimLines.map(el => el.trim()).filter(el => el.length > 0);
}
