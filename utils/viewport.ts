import {Dimensions} from 'react-native';

const dimension = Dimensions.get('window');

export function getViewportWidth() {
  return dimension.width;
}
