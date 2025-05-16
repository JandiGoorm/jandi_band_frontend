/*  유튜브 임베드 링크로 바꾸는 함수. 
    youtu.be/뒤가 영상 아이디라고 하네요
    url 객체를 사용했습니다. */

export function changeToEmbed(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // 공유 링크인지 확인
    if (!parsedUrl.hostname.includes("youtu.be")) return null;

    const videoId = parsedUrl.pathname.slice(1);
    return `https://www.youtube.com/embed/${videoId}`;
  } catch (e) {
    console.error("유효하지 않은 URL", e);
    return null;
  }
}

/* 추후 추가해야할것 : 유튜브 공유 링크가 아닐 경우 예외처리 (O)
    -> null로 리턴하는데, 이 경우 화면에 경고 문구 띄우도록 */
// 노트북일 경우 watch~ 로 시작하는 url 관리 -> 현재는 공유 링크로만 임베드되게 해놨음
