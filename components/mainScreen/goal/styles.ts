import {StyleSheet} from 'react-native';
import {getViewportWidth} from '@/utils/viewport';
import {Layout as LayoutConstants} from '@/constants/Layout';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  hiddenText: {
    position: 'absolute',
    width: getViewportWidth() * LayoutConstants.padding.horizontal,
    top: 1000,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    zIndex: -1,
  },
});
