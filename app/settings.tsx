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

export default function SettingsScreen() {
  const settingsItems = [
    {
      icon: 'info-circle',
      title: '앱 사용방법 알아보기',
      onPress: () => router.push('/onboarding'),
      showArrow: true,
    },
    {
      icon: 'document-text-outline',
      title: '개인정보 처리방침',
      onPress: () => router.push('/privacy-policy'),
      showArrow: true,
    },
    {
      icon: 'document-text-outline',
      title: '이용약관',
      onPress: () => router.push('/terms-of-service'),
      showArrow: true,
    },
    {
      icon: 'information-circle-outline',
      title: '라이선스 정보',
      onPress: () => router.push('/license-info'),
      showArrow: true,
    },
  ];

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

      {/* Settings List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.settingsContainer}>
          {settingsItems.map((item, index) => (
            <Pressable
              key={index}
              style={styles.settingItem}
              onPress={item.onPress}
              android_ripple={{color: Colors.light.buttonDisabled}}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>{item.title}</Text>
              </View>
              {item.showArrow && (
                <AntDesign
                  name="right"
                  size={Theme.iconSize.small}
                  color={Colors.light.gray}
                />
              )}
            </Pressable>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionLabel}>앱 버전</Text>
          <Text style={styles.versionText}>1.0.0</Text>
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
    fontSize: Theme.fontSize.large,
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
  settingsContainer: {
    paddingTop: Theme.spacing.medium,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
    backgroundColor: Colors.light.white,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.formBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.medium,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Theme.fontSize.small + scale(2),
    fontFamily: Theme.fontFamily.semiBold,
    color: Theme.colors.highlight,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
    marginTop: Theme.spacing.large,
  },
  versionLabel: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.semiBold,
    color: Theme.colors.highlight,
    marginBottom: Theme.spacing.xs,
  },
  versionText: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.regular,
    color: Colors.light.gray,
  },
});
