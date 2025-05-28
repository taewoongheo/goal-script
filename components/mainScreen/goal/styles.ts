import {StyleSheet} from 'react-native';

import {Layout as LayoutConstants} from '@/constants/Layout';
import {Theme} from '@/constants/Theme';
import {viewportWidth} from '@/utils/viewport';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  hiddenText: {
    position: 'absolute',
    width: viewportWidth * LayoutConstants.padding.horizontal,
    top: 1000,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    zIndex: -1,
  },
  iconContainer: {
    marginRight: Theme.iconSpace.medium,
  },
});
