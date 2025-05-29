import {Colors} from '@/constants/Colors';

// 공통 BottomSheet 속성들
export const commonBottomSheetProps = {
  index: -1,
  enablePanDownToClose: true,
  handleIndicatorStyle: {backgroundColor: Colors.light.gray},
  backgroundStyle: {backgroundColor: Colors.light.white},
  keyboardBehavior: 'interactive' as const,
  keyboardBlurBehavior: 'restore' as const,
  android_keyboardInputMode: 'adjustResize' as const,
  enableDynamicSizing: true,
};

export const commonStyles = {
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
};
