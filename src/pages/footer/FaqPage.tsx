import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./FaqPage.module.css";

const faqs = [
  {
    question: "Rhythmeet는 어떤 서비스인가요?",
    answer:
      "밴드 팀원들이 각자의 시간표를 입력하면, 겹치는 연습 가능한 시간을 자동으로 계산해주는 웹 서비스입니다.",
  },
  {
    question: "동아리/팀 팀원들을 초대하려면 어떻게 해야하나요?",
    answer:
      "[팀원초대] 버튼을 통해 초대 코드를 발급 받아 링크를 전달하거나, [카카오톡 공유하기] 버튼을 통해 초대 코드를 공유할 수 있습니다. 이 경우에는 카카오톡 메세지가 전송됩니다.",
  },
  {
    question: "시간표는 어떻게 입력하나요?",
    answer:
      "[팀 생성하기] 버튼을 통해 팀을 생성합니다. 그 후 [내 시간표 입력] 버튼을 눌러 시간표를 입력할 수 있습니다.",
  },
  {
    question: "자주 쓰는 시간표를 저장하고싶어요. 가능할까요?",
    answer:
      "'마이페이지' 하단의 [내 시간표관리]-[시간표 추가]를 통해 자주 사용하는 시간표를 저장할 수 있습니다.",
  },
  {
    question:
      "자주 쓰는 시간표를 어떻게 불러오나요? / 저장된 시간표를 어떻게 사용하나요?",
    answer:
      "[팀페이지] - [내 시간표입력] - 아래로 스크롤 후 [+]버튼을 누르면 마이페이지에 저장된 시간표를 불러올 수 있습니다.",
  },
  {
    question: "에브리타임 시간표는 어떻게 불러오나요?",
    answer:
      "'마이페이지' 하단의 [내 시간표관리]-[시간표 추가]를 통해 에브리타임 시간표를 불러올 수 있습니다. 사용 방법은 가이드를 확인해주세요.",
  },
  {
    question: "에브리타임 시간표가 안불러와져요",
    answer:
      "시간표가 비공개이거나 URL이 잘못되었을 경우 시간표 불러오기가 불가능할 수 있습니다.",
  },
  {
    question: "투표 기능은 어떻게 사용하나요?",
    answer:
      "투표 탭에서 곡을 등록하면, 다른 팀원들이 투표할 수 있습니다. [결과 보기]를 통해 결과 확인이 가능합니다.",
  },
  {
    question: "투표 기능도 초대가 가능한가요?",
    answer: "네. [공유하기] 버튼을 누를 경우 카카오톡 공유하기로 연결됩니다.",
  },
  {
    question: "카카오 로그인이 안돼요.",
    answer:
      "카카오 계정 연결 상태를 확인하거나, 브라우저 캐시를 삭제 후 재시도해보세요. 문제가 지속되면 고객센터로 문의해주세요.",
  },
  {
    question: "회원 탈퇴는 어디서 하나요?",
    answer:
      "마이페이지 > 설정 > 회원 탈퇴 메뉴에서 가능합니다. 탈퇴 시 모든 정보가 삭제됩니다.",
  },
];

const FaqPage = () => {
  return (
    <DefaultLayout>
      <div className={styles.faq_container}>
        <h1>자주 묻는 질문 (FAQ)</h1>
        <ul className={styles.faq_list}>
          {faqs.map((faq, index) => (
            <li key={index} className={styles.faq_item}>
              <details>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </DefaultLayout>
  );
};

export default FaqPage;
