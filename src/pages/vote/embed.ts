/*  유튜브 임베드 링크로 바꾸는 함수. 
    youtu.be/뒤가 영상 아이디라고 하네요
    url 객체를 사용했습니다. */

export function changeToEmbed(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    let videoId: string | null = null;

    // 유튜브 공유 링크일 경우 처리
    if (parsedUrl.hostname.includes("youtu.be")) {
      videoId = parsedUrl.pathname.slice(1);
    }

    // 유튜브 브라우저 복사 링크일 경우 처리
    else if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.pathname === "/watch"
    ) {
      videoId = parsedUrl.searchParams.get("v");
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  } catch (e) {
    console.error("유효하지 않은 URL", e);
    return null;
  }
}

/* 추후 추가해야할것 : 유튜브 공유 링크가 아닐 경우 예외처리 (O)
    -> null로 리턴하는데, 이 경우 화면에 경고 문구 띄우도록 */
