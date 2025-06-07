import axios from "axios";

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_CLIENT_ID;

export const useKakao = () => {
  const searchKeyword = async (keyword: string) => {
    const res = await axios.get(
      "https://dapi.kakao.com/v2/local/search/keyword.json",
      {
        params: { query: keyword },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    return res.data.documents; // 결과 목록 반환
  };

  return { searchKeyword };
};
