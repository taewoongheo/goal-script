import {useState} from 'react';

export type ToggleKey = 'dday' | 'achieved' | 'todos';

export function useToggleExpand() {
  const [ddayExpand, setDdayExpand] = useState<boolean>(false);
  const [achievedExpand, setAchievedExpand] = useState<boolean>(false);
  const [todosExpand, setTodosExpand] = useState<boolean>(false);

  const expandStates = {
    dday: [ddayExpand, setDdayExpand] as const,
    achieved: [achievedExpand, setAchievedExpand] as const,
    todos: [todosExpand, setTodosExpand] as const,
  };

  const handleToggle = (key: ToggleKey) => {
    Object.entries(expandStates).forEach(([k, [, setter]]) => {
      setter(k === key ? prev => !prev : false);
    });
  };

  return {
    expandStates,
    handleToggle,
  };
}
