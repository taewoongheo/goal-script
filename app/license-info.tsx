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
          <Text style={styles.sectionTitle}>오픈소스 라이선스</Text>
          <Text style={styles.contentText}>
            이 앱은 다음의 오픈소스 라이브러리들을 사용합니다:
          </Text>

          <Text style={styles.libraryTitle}>React Native</Text>
          <Text style={styles.libraryInfo}>
            Copyright (c) Meta Platforms, Inc. and affiliates.{'\n'}
            MIT License
          </Text>

          <Text style={styles.libraryTitle}>Expo</Text>
          <Text style={styles.libraryInfo}>
            Copyright (c) 2015-present 650 Industries, Inc.{'\n'}
            MIT License
          </Text>

          <Text style={styles.libraryTitle}>Zustand</Text>
          <Text style={styles.libraryInfo}>
            Copyright (c) 2019 Paul Henschel{'\n'}
            MIT License
          </Text>

          <Text style={styles.libraryTitle}>React Native Vector Icons</Text>
          <Text style={styles.libraryInfo}>
            Copyright (c) 2015 Joel Arvidsson{'\n'}
            MIT License
          </Text>

          <Text style={styles.libraryTitle}>React Native Reanimated</Text>
          <Text style={styles.libraryInfo}>
            Copyright (c) 2016 Software Mansion{'\n'}
            MIT License
          </Text>

          <Text style={styles.libraryTitle}>React Native Gesture Handler</Text>
          <Text style={styles.libraryInfo}>
            Copyright (c) 2016 Software Mansion{'\n'}
            MIT License
          </Text>

          <Text style={styles.libraryTitle}>Bottom Sheet</Text>
          <Text style={styles.libraryInfo}>
            Copyright (c) 2021 Mo Gorhom{'\n'}
            MIT License
          </Text>

          <Text style={styles.sectionTitle}>MIT License</Text>
          <Text style={styles.licenseText}>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:{'\n\n'}
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

          <Text style={styles.lastUpdated}>최종 수정일: 2024년 1월 1일</Text>
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
    lineHeight: Theme.fontSize.small * 1.5,
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
    lineHeight: Theme.fontSize.small * 1.3,
    marginBottom: Theme.spacing.small,
  },
  licenseText: {
    fontSize: Theme.fontSize.small - 1,
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.textSecondary,
    lineHeight: Theme.fontSize.small * 1.3,
    marginBottom: Theme.spacing.medium,
  },
  lastUpdated: {
    fontSize: Theme.fontSize.small - 2,
    fontFamily: Theme.fontFamily.regular,
    color: Colors.light.gray,
    textAlign: 'center',
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.large,
  },
});
