import {formatRDay, parseLine} from '@/components/mainScreen/utils/utils';

describe('parseLine', () => {
  const SUFFIX = '남았어요';

  it('should handle noWrap case correctly', () => {
    const rDay = '2025.10.15';
    const texts = [
      '마라톤 완주하기까지',
      `D-175 ${formatRDay(rDay)} ${SUFFIX}`,
    ];
    const expected = {
      type: 'noWrap',
      lines: ['마라톤 완주하기까지', 'D-175'],
    };
    expect(parseLine(texts, rDay)).toEqual(expected);
  });

  it('should handle strWrap case correctly', () => {
    const rDay = '2025.12.20';
    const texts = [
      '인공지능 윤리에 관한 학술 논문 게재까지 D-111241',
      `${formatRDay(rDay)} 남`, // rDay on second-to-last line, SUFFIX not on last line
      '았어요',
    ];
    const expected = {
      type: 'strWrap',
      lines: [
        '인공지능 윤리에 관한 학술 논문 게재까지 D-111241',
        formatRDay(rDay), // Only rDay remains on this line
        '았어요',
      ],
    };
    expect(parseLine(texts, rDay)).toEqual(expected);
  });

  it('should handle rDayWrap case correctly (rDay split)', () => {
    const rDay = '2025.11.01';
    const texts = [
      '새로운 프로그래밍 언어 배우기까지',
      `D-190 ${formatRDay(rDay).substring(0, 8)}`, // rDay is split
      `${formatRDay(rDay).substring(8)} ${SUFFIX}`,
    ];
    const expected = {
      type: 'rDayWrap',
      lines: [
        '새로운 프로그래밍 언어 배우기까지',
        `D-190 ${formatRDay(rDay).substring(0, 8)}`,
        `${formatRDay(rDay).substring(8)} ${SUFFIX}`,
      ], // Lines are just trimmed in rDayWrap
    };
    expect(parseLine(texts, rDay)).toEqual(expected);
  });

  it('should handle single line case as noWrap', () => {
    const rDay = '2025.08.15';
    const texts = [
      `단편 소설 완성하기까지 D-110 ${formatRDay(rDay)} ${SUFFIX}`,
    ];
    const expected = {
      type: 'noWrap',
      lines: ['단편 소설 완성하기까지 D-110'],
    };
    expect(parseLine(texts, rDay)).toEqual(expected);
  });
});
