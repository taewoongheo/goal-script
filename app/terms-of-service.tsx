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
        <Text style={styles.headerTitle}>서비스 이용약관</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.introText}>
            Goal Script(이하 회사)가 제공하는 모바일 애플리케이션 서비스의
            이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을
            규정합니다.
          </Text>

          <Text style={styles.sectionTitle}>제1조 (목적)</Text>
          <Text style={styles.contentText}>
            이 약관은 Goal Script(이하 회사)가 제공하는 모바일 애플리케이션 Goal
            Script(이하 서비스)의 이용과 관련하여 회사와 이용자 간의 권리, 의무
            및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </Text>

          <Text style={styles.sectionTitle}>제2조 (정의)</Text>
          <Text style={styles.contentText}>
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다:
            {'\n\n'}1. 서비스: 회사가 제공하는 Goal Script 모바일 애플리케이션
            및 관련 서비스
            {'\n'}2. 이용자: 이 약관에 따라 서비스를 이용하는 개인
            {'\n'}3. 콘텐츠: 이용자가 서비스 내에서 생성, 등록, 저장하는 목표,
            할 일, 텍스트, 이미지 등의 정보
            {'\n'}4. 계정: 서비스 이용을 위해 이용자의 기기에 생성되는 고유 식별
            정보
            {'\n'}5. 앱스토어: Apple App Store, Google Play Store 등
            애플리케이션 유통 플랫폼
          </Text>

          <Text style={styles.sectionTitle}>제3조 (약관의 효력 및 변경)</Text>
          <Text style={styles.contentText}>
            ① 이 약관은 서비스 이용 시 이용자에게 공지함으로써 효력을
            발생합니다.
            {'\n\n'}② 회사는 합리적인 사유가 발생할 경우 관련법령에 위배되지
            않는 범위 내에서 이 약관을 변경할 수 있습니다.
            {'\n\n'}③ 약관이 변경되는 경우, 회사는 변경된 약관의 적용일자 및
            변경사유를 명시하여 적용일자 7일 이전부터 서비스 내 공지사항을 통해
            공지합니다.
            {'\n\n'}④ 이용자가 변경된 약관에 동의하지 않을 경우, 서비스 이용을
            중단하고 애플리케이션을 삭제할 수 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>제4조 (서비스의 제공 및 내용)</Text>
          <Text style={styles.contentText}>
            ① 회사는 이용자에게 다음과 같은 서비스를 제공합니다:
            {'\n'}• 목표 설정 및 관리 기능
            {'\n'}• 할 일(To-do) 생성, 편집, 삭제 기능
            {'\n'}• 진행 상황 추적 및 통계 기능
            {'\n'}• 목표 완료 기능
            {'\n'}• 데이터 백업 및 복원 기능 (로컬 저장)
            {'\n\n'}② 서비스는 무료로 제공되며, 연중무휴 24시간 이용할 수
            있습니다.
            {'\n\n'}③ 회사는 서비스 개선을 위해 사전 통지 후 서비스의 내용을
            변경할 수 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>제5조 (서비스 이용)</Text>
          <Text style={styles.contentText}>
            ① 서비스 이용은 이용자가 앱스토어에서 애플리케이션을 다운로드하고
            설치함으로써 시작됩니다.
            {'\n\n'}② 별도의 회원가입 절차는 없으며, 앱 설치 즉시 서비스를
            이용할 수 있습니다.
            {'\n\n'}③ 이용자의 모든 데이터는 이용자의 기기에 로컬로 저장되며,
            회사는 이용자의 개인 데이터를 수집하거나 외부 서버에 저장하지
            않습니다.
            {'\n\n'}④ 서비스 이용 중 발생하는 데이터 통신료는 이용자가
            부담합니다.
          </Text>

          <Text style={styles.sectionTitle}>
            제6조 (서비스 이용의 제한 및 중단)
          </Text>
          <Text style={styles.contentText}>
            ① 회사는 다음 각 호의 경우 사전 통지 없이 서비스 제공을 중단할 수
            있습니다:
            {'\n'}• 정기점검, 서버 증설 및 교체 등 시스템 운영상 필요한 경우
            {'\n'}• 정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인
            서비스 이용에 지장이 있는 경우
            {'\n'}• 기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이
            부적당하다고 인정하는 경우
            {'\n\n'}② 앞 항의 경우 회사는 사전 또는 사후에 이를 공지합니다.
          </Text>

          <Text style={styles.sectionTitle}>제7조 (이용자의 의무)</Text>
          <Text style={styles.contentText}>
            ① 이용자는 서비스 이용 시 다음 행위를 하여서는 안 됩니다:
            {'\n'}• 회사 직원이나 관리자를 가장하는 행위
            {'\n'}• 서비스를 무단으로 영리, 영업, 광고, 홍보 등의 목적으로
            이용하는 행위
            {'\n'}• 다른 이용자의 개인정보를 무단으로 수집, 저장, 공개하는 행위
            {'\n'}• 음란하거나 저속한 내용의 정보, 문장, 도형 등을 등록,
            배포하는 행위
            {'\n'}• 서비스의 안정적 운영을 방해할 수 있는 행위
            {'\n'}• 기타 관련법령에 위배되거나 선량한 풍속 기타 사회통념에
            반하는 행위
            {'\n\n'}② 이용자는 관련법령, 이 약관의 규정, 이용안내 및 서비스와
            관련하여 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야
            합니다.
          </Text>

          <Text style={styles.sectionTitle}>제8조 (콘텐츠의 저작권)</Text>
          <Text style={styles.contentText}>
            ① 이용자가 서비스 내에서 작성한 콘텐츠에 대한 저작권은 이용자에게
            귀속됩니다.
            {'\n\n'}② 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은
            회사에 귀속됩니다.
            {'\n\n'}③ 이용자는 서비스를 이용하여 얻은 정보 중 회사에게
            지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판,
            배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게
            이용하게 하여서는 안 됩니다.
          </Text>

          <Text style={styles.sectionTitle}>제9조 (개인정보보호)</Text>
          <Text style={styles.contentText}>
            ① 회사는 이용자의 개인정보 보호를 위해 개인정보보호법 등 관련 법령을
            준수합니다.
            {'\n\n'}② 개인정보의 보호 및 사용에 대해서는 관련법령 및 회사의
            개인정보처리방침이 적용됩니다.
            {'\n\n'}③ 서비스의 특성상 이용자의 모든 데이터는 이용자 기기에만
            저장되며, 회사는 이용자의 개인 데이터에 접근하지 않습니다.
          </Text>

          <Text style={styles.sectionTitle}>제10조 (회사의 의무)</Text>
          <Text style={styles.contentText}>
            ① 회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지
            않으며, 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를
            제공하기 위해서 노력합니다.
            {'\n\n'}② 회사는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록
            이용자의 개인정보보호를 위한 보안 시스템을 구축합니다.
            {'\n\n'}③ 회사는 서비스 이용과 관련하여 이용자로부터 제기된 의견이나
            불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를 거쳐 즉시
            처리하여야 합니다.
          </Text>

          <Text style={styles.sectionTitle}>제11조 (손해배상)</Text>
          <Text style={styles.contentText}>
            ① 회사와 이용자는 서비스 이용과 관련하여 고의 또는 과실로 상대방에게
            손해를 끼친 경우에는 이를 배상할 책임이 있습니다.
            {'\n\n'}② 회사는 무료서비스와 관련하여 이용자에게 어떠한 손해가
            발생하더라도 동손해가 회사의 고의 또는 중대한 과실에 의한 경우를
            제외하고 이에 대하여 책임을 부담하지 아니합니다.
          </Text>

          <Text style={styles.sectionTitle}>제12조 (면책조항)</Text>
          <Text style={styles.contentText}>
            ① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
            제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
            {'\n\n'}② 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에
            대하여는 책임을 지지 않습니다.
            {'\n\n'}③ 회사는 이용자가 서비스와 관련하여 게재한 정보, 자료,
            사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.
            {'\n\n'}④ 회사는 이용자 기기의 오류, 분실, 고장 등으로 인한 데이터
            손실에 대해 책임을 지지 않습니다.
          </Text>

          <Text style={styles.sectionTitle}>제13조 (분쟁해결)</Text>
          <Text style={styles.contentText}>
            ① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를
            보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.
            {'\n\n'}② 회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은
            제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를
            관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소
            또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의
            관할법원에 제기합니다.
            {'\n\n'}③ 회사와 이용자 간에 제기된 전자상거래 소송에는 한국법을
            적용합니다.
          </Text>

          <Text style={styles.sectionTitle}>제14조 (기타)</Text>
          <Text style={styles.contentText}>
            ① 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
            전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한
            법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자보호지침 및
            관계법령 또는 상관례에 따릅니다.
            {'\n\n'}② 본 약관은 2024년 12월 20일부터 적용됩니다.
          </Text>

          <Text style={styles.lastUpdated}>최종 수정일: 2024년 12월 20일</Text>
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
