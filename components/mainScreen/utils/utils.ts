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
  } else if (type === 'rDayWrap') {
    const last = lines[lines.length - 1];
    const pLast = last.replace(/남았어요/, '');
    pLast.trim();
    lines[lines.length - 1] = pLast;
  }

  lines = lines.map(el => el.trim());

  return {
    type,
    lines,
  };
}

export function tokenizeLineWithDday(line: string, dDay: number) {
  const tokens = line.split(' ');
  const dDayString = `D-${dDay}`;
  const isTouchableDDayToken = tokens.some(el => el.includes(dDayString));
  let parsedTokens: [string, boolean, number][] = [];
  if (isTouchableDDayToken) {
    parsedTokens = tokens.map((element, index) => {
      if (element === dDayString) return [element, true, index];
      return [element, false, index];
    });
  }

  return {
    isTouchableDDayToken,
    parsedTokens,
  };
}
