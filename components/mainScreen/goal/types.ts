import {StyleProp, ViewStyle, TextStyle} from 'react-native';

export interface GoalSectionStyles {
  lineContainer: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  highlight: StyleProp<TextStyle>;
}

export interface GoalLineProps {
  line: string;
  isLastLine: boolean;
  onToggleGoal: () => void;
  isGoalExpanded: boolean;
  styles: GoalSectionStyles;
  linearTransitionAnimation: any;
  fadeInAnimation: any;
  fadeOutAnimation: any;
}

export interface GoalSectionProps {
  title: string;
  icon: string;
  isGoalExpanded: boolean;
  onToggleGoal: (_key: string) => void;
  styles: GoalSectionStyles;
  linearTransitionAnimation: any;
  fadeInAnimation: any;
  fadeOutAnimation: any;
}
