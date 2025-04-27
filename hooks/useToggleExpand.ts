import {useState} from 'react';

export type ToggleKey = 'goal' | 'dday' | 'achieved' | 'todos';

export function useToggleExpand() {
  const [goalExpand, setGoalExpand] = useState<boolean>(false);
  const [ddayExpand, setDdayExpand] = useState<boolean>(false);
  const [achievedExpand, setAchievedExpand] = useState<boolean>(false);
  const [todosExpand, setTodosExpand] = useState<boolean>(false);

  const expandStates = {
    goal: [goalExpand, setGoalExpand] as const,
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
