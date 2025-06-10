import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {router} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import {scale} from 'react-native-size-matters';

export default function LicenseInfoScreen() {
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

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.introText}>
            Goal Script 앱은 다음과 같은 오픈소스 라이브러리들을 사용하여
            개발되었습니다. 각 라이브러리의 라이선스 조건을 준수하여 사용하고
            있습니다.
          </Text>

          <Text style={styles.sectionTitle}>오픈소스 라이브러리</Text>

          <Text style={styles.libraryTitle}>React Native</Text>
          <Text style={styles.libraryInfo}>
            Version: 0.74.1{'\n'}
            Copyright (c) Meta Platforms, Inc. and affiliates.{'\n'}
            MIT License{'\n'}
            크로스 플랫폼 모바일 앱 개발 프레임워크
          </Text>

          <Text style={styles.libraryTitle}>Expo</Text>
          <Text style={styles.libraryInfo}>
            Version: ~51.0.8{'\n'}
            Copyright (c) 2015-present 650 Industries, Inc.{'\n'}
            MIT License{'\n'}
            React Native 개발 플랫폼 및 빌드 도구
          </Text>

          <Text style={styles.libraryTitle}>Expo Router</Text>
          <Text style={styles.libraryInfo}>
            Version: ~3.5.14{'\n'}
            Copyright (c) Expo{'\n'}
            MIT License{'\n'}
            파일 기반 네비게이션 라이브러리
          </Text>

          <Text style={styles.libraryTitle}>Expo Image</Text>
          <Text style={styles.libraryInfo}>
            Version: ~1.12.9{'\n'}
            Copyright (c) Expo{'\n'}
            MIT License{'\n'}
            고성능 이미지 컴포넌트
          </Text>

          <Text style={styles.libraryTitle}>Zustand</Text>
          <Text style={styles.libraryInfo}>
            Version: ^4.5.2{'\n'}
            Copyright (c) 2019 Paul Henschel{'\n'}
            MIT License{'\n'}
            상태 관리 라이브러리
          </Text>

          <Text style={styles.libraryTitle}>React Native Vector Icons</Text>
          <Text style={styles.libraryInfo}>
            Version: ^10.0.3{'\n'}
            Copyright (c) 2015 Joel Arvidsson{'\n'}
            MIT License{'\n'}
            아이콘 라이브러리 (AntDesign 포함)
          </Text>

          <Text style={styles.libraryTitle}>React Native Reanimated</Text>
          <Text style={styles.libraryInfo}>
            Version: ~3.10.1{'\n'}
            Copyright (c) 2016 Software Mansion{'\n'}
            MIT License{'\n'}
            고성능 애니메이션 라이브러리
          </Text>

          <Text style={styles.libraryTitle}>React Native Gesture Handler</Text>
          <Text style={styles.libraryInfo}>
            Version: ~2.16.1{'\n'}
            Copyright (c) 2016 Software Mansion{'\n'}
            MIT License{'\n'}
            터치 제스처 처리 라이브러리
          </Text>

          <Text style={styles.libraryTitle}>React Native Bottom Sheet</Text>
          <Text style={styles.libraryInfo}>
            Version: ^4.6.3{'\n'}
            Copyright (c) 2021 Mo Gorhom{'\n'}
            MIT License{'\n'}
            바텀시트 UI 컴포넌트
          </Text>

          <Text style={styles.libraryTitle}>
            React Native Safe Area Context
          </Text>
          <Text style={styles.libraryInfo}>
            Version: 4.10.1{'\n'}
            Copyright (c) 2019 Th3rd Wave{'\n'}
            MIT License{'\n'}
            안전 영역 처리 라이브러리
          </Text>

          <Text style={styles.libraryTitle}>React Native Size Matters</Text>
          <Text style={styles.libraryInfo}>
            Version: ^0.4.2{'\n'}
            Copyright (c) Nirsky{'\n'}
            MIT License{'\n'}
            반응형 스크린 크기 조정 라이브러리
          </Text>

          <Text style={styles.libraryTitle}>React Native Date Picker</Text>
          <Text style={styles.libraryInfo}>
            Version: ^5.0.4{'\n'}
            Copyright (c) henninghall{'\n'}
            MIT License{'\n'}
            날짜 선택 컴포넌트
          </Text>

          <Text style={styles.sectionTitle}>MIT License 전문</Text>
          <Text style={styles.licenseText}>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
            {'\n\n'}
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
            {'\n\n'}
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </Text>

          <Text style={styles.contentText}>
            {'\n\n'}문의사항이 있으시면 chamjoeun0111@gmail.com으로 연락해
            주세요.
          </Text>
          <Text style={styles.lastUpdated}>최종 수정일: 2025년 6월 10일</Text>
        </View>
      </ScrollView>
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
    paddingBottom: Theme.spacing.medium,
    backgroundColor: Colors.light.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.lightGray,
  },
  backButton: {
    padding: Theme.spacing.xs,
  },
  headerTitle: {
    fontSize: Theme.fontSize.medium,
    fontFamily: Theme.fontFamily.bold,
    color: Theme.colors.highlight,
    flex: 1,
    textAlign: 'center',
    marginRight: Theme.spacing.large + Theme.spacing.xs * 2,
  },
  headerSpacer: {
    width: Theme.spacing.large + Theme.spacing.xs * 2,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Theme.spacing.large,
  },
  introText: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.textSecondary,
    lineHeight: Theme.fontSize.small * 1.6,
    marginBottom: Theme.spacing.large,
    backgroundColor: Colors.light.formBackground,
    padding: Theme.spacing.medium,
    borderRadius: Theme.borderRadius.small,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.small + scale(2),
    fontFamily: Theme.fontFamily.bold,
    color: Theme.colors.highlight,
    marginTop: Theme.spacing.large,
    marginBottom: Theme.spacing.medium,
  },
  contentText: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.textSecondary,
    lineHeight: Theme.fontSize.small * 1.6,
    marginBottom: Theme.spacing.medium,
  },
  libraryTitle: {
    fontSize: Theme.fontSize.small + scale(1),
    fontFamily: Theme.fontFamily.semiBold,
    color: Theme.colors.highlight,
    marginTop: Theme.spacing.medium,
    marginBottom: Theme.spacing.xs,
  },
  libraryInfo: {
    fontSize: Theme.fontSize.small - 1,
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.textSecondary,
    lineHeight: Theme.fontSize.small * 1.4,
    marginBottom: Theme.spacing.small,
    backgroundColor: Colors.light.formBackground,
    padding: Theme.spacing.small,
    borderRadius: Theme.borderRadius.small,
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.highlight,
  },
  licenseText: {
    fontSize: Theme.fontSize.small - 2,
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.textSecondary,
    lineHeight: Theme.fontSize.small * 1.4,
    marginBottom: Theme.spacing.medium,
    backgroundColor: Colors.light.formBackground,
    padding: Theme.spacing.medium,
    borderRadius: Theme.borderRadius.small,
    fontStyle: 'italic',
  },
  lastUpdated: {
    fontSize: Theme.fontSize.small - 2,
    fontFamily: Theme.fontFamily.regular,
    color: Colors.light.gray,
    textAlign: 'center',
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.large,
    padding: Theme.spacing.medium,
    backgroundColor: Colors.light.formBackground,
    borderRadius: Theme.borderRadius.small,
  },
});
