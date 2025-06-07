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

export default function PrivacyPolicyScreen() {
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
          <Text style={styles.sectionTitle}>1. 개인정보의 처리 목적</Text>
          <Text style={styles.contentText}>
            본 앱은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등
            필요한 조치를 이행할 예정입니다.
          </Text>

          <Text style={styles.sectionTitle}>
            2. 개인정보의 처리 및 보유기간
          </Text>
          <Text style={styles.contentText}>
            본 앱은 정보주체로부터 개인정보를 수집할 때 동의받은 개인정보
            보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서
            개인정보를 처리·보유합니다.
          </Text>

          <Text style={styles.sectionTitle}>3. 개인정보의 제3자 제공</Text>
          <Text style={styles.contentText}>
            본 앱은 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위
            내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등
            개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를
            제3자에게 제공합니다.
          </Text>

          <Text style={styles.sectionTitle}>4. 개인정보의 안전성 확보조치</Text>
          <Text style={styles.contentText}>
            본 앱은 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에
            필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>5. 개인정보보호책임자</Text>
          <Text style={styles.contentText}>
            본 앱은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보보호책임자를 지정하고 있습니다.
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
  lastUpdated: {
    fontSize: Theme.fontSize.small - 2,
    fontFamily: Theme.fontFamily.regular,
    color: Colors.light.gray,
    textAlign: 'center',
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.large,
  },
});
