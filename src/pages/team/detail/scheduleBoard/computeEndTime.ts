// 시간만 받는 end time을 비교하고, 서버 전송 양식을 맞추기 위한 함수
export const computeEndDatetime = (
  startDatetime: string,
  endTime: string
): Date => {
  // 스타트 시간
  const start = new Date(startDatetime);
  // [시간,분] 으로 각각의 숫자를 분리해서 넣어놓음
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const end = new Date(start); // ex) new Date("2024-06-06T16:00") 가 됨
  end.setHours(endHour, endMinute); // Date에서 기본으로 제공되는 메서드임.
  return end;
};
