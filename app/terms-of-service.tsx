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

export default function TermsOfServiceScreen() {
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
          <Text style={styles.sectionTitle}>제1조 (목적)</Text>
          <Text style={styles.contentText}>
            이 약관은 Goal Script 앱(이하 "서비스")의 이용과 관련하여 회사와
            이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을
            목적으로 합니다.
          </Text>

          <Text style={styles.sectionTitle}>제2조 (정의)</Text>
          <Text style={styles.contentText}>
            1. "서비스"란 Goal Script 앱을 통해 제공되는 모든 서비스를
            의미합니다.{'\n'}
            2. "이용자"란 이 약관에 따라 서비스를 이용하는 자를 의미합니다.
            {'\n'}
            3. "콘텐츠"란 이용자가 서비스를 이용하면서 생성하는 모든 정보를
            의미합니다.
          </Text>

          <Text style={styles.sectionTitle}>제3조 (약관의 효력 및 변경)</Text>
          <Text style={styles.contentText}>
            1. 이 약관은 서비스 이용 시 이용자에게 고지함으로써 효력을
            발생합니다.{'\n'}
            2. 회사는 필요한 경우 이 약관을 변경할 수 있으며, 변경된 약관은
            서비스 내 공지를 통해 이용자에게 고지합니다.
          </Text>

          <Text style={styles.sectionTitle}>제4조 (서비스의 제공)</Text>
          <Text style={styles.contentText}>
            1. 회사는 이용자에게 목표 설정 및 관리 서비스를 제공합니다.{'\n'}
            2. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.{'\n'}
            3. 회사는 기술적 사양의 변경 등의 경우 제공하고 있는 서비스를 변경할
            수 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>제5조 (이용자의 의무)</Text>
          <Text style={styles.contentText}>
            1. 이용자는 서비스 이용 시 이 약관과 관련 법령을 준수해야 합니다.
            {'\n'}
            2. 이용자는 타인의 권리를 침해하거나 불법적인 행위를 해서는 안
            됩니다.{'\n'}
            3. 이용자는 서비스의 안정적 운영을 방해하는 행위를 해서는 안 됩니다.
          </Text>

          <Text style={styles.sectionTitle}>제6조 (면책조항)</Text>
          <Text style={styles.contentText}>
            1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
            제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.{'\n'}
            2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는
            책임을 지지 않습니다.
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
