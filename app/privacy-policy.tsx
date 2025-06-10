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
          <Text style={styles.introText}>
            Goal Script(이하 "회사")는 개인정보보호법에 따라 이용자의 개인정보를
            보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기
            위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </Text>

          <Text style={styles.sectionTitle}>제1조. 개인정보의 처리 목적</Text>
          <Text style={styles.contentText}>
            회사는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적
            이외의 용도로는 이용하지 않습니다.
            {'\n\n'}• 서비스 제공: 목표 설정, 할 일 관리, 진행 상황 추적 등 앱
            기본 기능 제공
            {'\n'}• 앱 최적화: 사용자 경험 개선 및 서비스 안정성 향상
            {'\n'}• 법적 의무 이행: 관련 법령에 따른 의무 이행
          </Text>

          <Text style={styles.sectionTitle}>
            제2조. 개인정보의 처리 및 보유기간
          </Text>
          <Text style={styles.contentText}>
            ① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
            개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서
            개인정보를 처리·보유합니다.
            {'\n\n'}② 구체적인 개인정보 처리 및 보유기간은 다음과 같습니다:
            {'\n'}• 앱 사용 기록: 최종 사용일로부터 1년
            {'\n'}• 목표 및 할 일 데이터: 앱 삭제 시까지 (로컬 저장)
            {'\n'}• 장애 및 오류 분석 데이터: 수집일로부터 6개월
          </Text>

          <Text style={styles.sectionTitle}>
            제3조. 개인정보의 수집 및 이용
          </Text>
          <Text style={styles.contentText}>
            ① 수집하는 개인정보 항목:
            {'\n'}• 별도의 수집항목 없음
          </Text>

          <Text style={styles.sectionTitle}>제4조. 개인정보의 제3자 제공</Text>
          <Text style={styles.contentText}>
            ① 회사는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지
            않습니다. 다만, 다음의 경우에는 예외로 합니다:
            {'\n'}• 정보주체가 사전에 동의한 경우
            {'\n'}• 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
            방법에 따라 수사기관의 요구가 있는 경우
            {'\n\n'}② 현재 제3자 제공 현황: 없음
          </Text>

          <Text style={styles.sectionTitle}>제5조. 개인정보처리의 위탁</Text>
          <Text style={styles.contentText}>
            ① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
            처리업무를 위탁하고 있습니다:
            {'\n\n'}• 위탁받는 자(수탁자): Expo (앱 개발 플랫폼)
            {'\n'}• 위탁하는 업무의 내용: 앱 배포 및 업데이트 관리
            {'\n\n'}② 회사는 위탁계약 체결시 개인정보보호법 제26조에 따라
            위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치,
            재위탁 제한 등을 계약서 등 문서에 명시하고 있습니다.
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
