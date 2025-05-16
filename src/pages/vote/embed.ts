/*  유튜브 임베드 링크로 바꾸는 함수. 
    youtu.be/뒤가 영상 아이디라고 하네요
    url 객체를 사용했습니다. */

export function changeToEmbed(url: string): string {
  const parsedUrl = new URL(url);
  const videoId = parsedUrl.pathname.slice(1);
  return `https://www.youtube.com/embed/${videoId}`;
}
