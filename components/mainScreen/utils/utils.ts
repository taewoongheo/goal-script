export function formatRDay(date: string): string {
  return date.replace(/\./g, '.\u200B');
}

export interface ParsedLines {
  type: 'noWrap' | 'rDayWrap' | 'strWrap';
  lines: string[];
}

export function parseLine(texts: string[], rDay: string): ParsedLines {
  let lines: string[] = [...texts];

  const SUFFIX = '남았어요';

  let type: 'noWrap' | 'strWrap' | 'rDayWrap' | null = null;
  if (
    lines.at(-1)?.includes(SUFFIX) &&
    lines.at(-1)?.includes(formatRDay(rDay))
  )
    type = 'noWrap';
  else if (
    !lines.at(-1)?.includes(SUFFIX) &&
    lines.at(-2)?.includes(formatRDay(rDay))
  )
    type = 'strWrap';
  else type = 'rDayWrap';

  if (type === 'strWrap') {
    const sec = lines[lines.length - 2].split(' ');
    sec.pop();
    lines[lines.length - 2] = sec.join(' ');
  } else if (type === 'noWrap') {
    const last = lines[lines.length - 1].split(' ');
    last.pop();
    last.pop();
    lines[lines.length - 1] = last.join(' ');
  }

  lines = lines.map(el => el.trim());

  return {
    type,
    lines,
  };
}
