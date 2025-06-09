import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import {router} from 'expo-router';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import {Image} from 'expo-image';
import {AntDesign} from '@expo/vector-icons';
import {viewportHeight, viewportWidth} from '@/utils/viewport';
import {scale} from 'react-native-size-matters';

const {width: screenWidth} = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: any;
}

const onboardingData: OnboardingSlide[] = [
  {
    id: '1',
    title: '목표를 설정해보세요',
    description:
      '하단 탭의 + 아이콘을 눌러 \n 목표를 설정해보세요. \n또는 목표 아이콘을 눌러 \n다른 목표로 변경할 수 있어요',
    image: require('@/assets/images/onboarding/1.png'),
  },
  {
    id: '2',
    title: '굵게 강조된 텍스트는\n 터치할 수 있어요',
    description: '화면에 있는 강조된 텍스트들을 \n직접 터치해보세요',
    image: require('@/assets/images/onboarding/2.png'),
  },
  {
    id: '3',
    title: '하이라이트된 영역은 설정 \n또는 추가 정보를 표시해요',
    description: '각 영역마다 모두 다른 설정, \n추가 정보를 확인할 수 있어요',
    image: require('@/assets/images/onboarding/3.png'),
  },
  {
    id: '4',
    title: '디데이를 설정해보세요',
    description:
      '날짜 영역의 하이라이트를 눌러 \n목표의 디데이를 설정해보세요.',
    image: require('@/assets/images/onboarding/4.png'),
  },
  {
    id: '5',
    title: '목표를 달성해보세요',
    description:
      '목표를 달성했다면 "목표 완료하기" \n버튼을 눌러 목표를 완료하세요',
    image: require('@/assets/images/onboarding/5.png'),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const {contentOffset} = event.nativeEvent;
    const index = Math.round(contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  const handleComplete = () => {
    router.replace('/');
  };

  const renderSlide = ({item}: {item: OnboardingSlide}) => (
    <View style={styles.slide}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={{width: '100%', height: '100%'}}
            contentFit="contain"
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            {
              backgroundColor:
                index === currentIndex
                  ? Theme.colors.highlight
                  : Colors.light.lightGray,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <AntDesign
            name="arrowleft"
            size={Theme.iconSize.large}
            color={Theme.colors.highlight}
          />
        </Pressable>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.flatList}
      />

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {renderPagination()}

        {currentIndex === onboardingData.length - 1 && (
          <Pressable style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>완료</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.large,
    paddingTop: Theme.spacing.medium,
  },
  backButton: {
    padding: Theme.spacing.xs,
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    maxWidth: viewportWidth * 0.8,
  },
  imageContainer: {
    width: viewportWidth * 0.8,
    height: viewportHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.fontSize.large,
    fontFamily: Theme.fontFamily.bold,
    color: Theme.colors.highlight,
    textAlign: 'center',
    marginBottom: Theme.spacing.large,
  },
  description: {
    fontSize: Theme.fontSize.medium,
    fontFamily: Theme.fontFamily.regular,
    color: Colors.light.gray,
    textAlign: 'center',
    lineHeight: viewportHeight * 0.03,
  },
  bottomContainer: {
    paddingBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.large,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.large,
  },
  paginationDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    marginHorizontal: scale(4),
  },
  completeButton: {
    backgroundColor: Theme.colors.highlight,
    paddingVertical: Theme.spacing.small + scale(8),
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.medium,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.semiBold,
    color: Colors.light.white,
  },
});
