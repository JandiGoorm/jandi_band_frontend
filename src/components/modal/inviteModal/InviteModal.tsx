// 해당 컴포넌트는 동아리 초대 및 팀 초대를 지원하는 모달 컴포넌트 입니다.
import type { ApiResponse } from "@/apis/types";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { type AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import styles from "./InviteModal.module.css";
import kakao from "@/pages/vote/style/kakao.svg";

declare global {
  interface Window {
    // Kakao: any;
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Link: {
        sendCustom: (options: {
          templateId: number;
          templateArgs?: Record<string, string>;
        }) => void;
      };
    };
  }
}

interface InviteModalProps {
  data: AxiosResponse<ApiResponse<{ code: string }>> | undefined;
  mutate: () => void;
  type: "club" | "team";
  nameValue: string; // props로 이름 변경하기 위해 추가함
}

const InviteModal = ({ data, mutate, type, nameValue }: InviteModalProps) => {
  const [copied, setCopied] = useState(false); // 복사 버튼 클릭시 복사됨!

  // 모달에 동아리초대,팀초대 표시 위해서
  const name = type === "club" ? "동아리" : "팀";

  //  새 링크 생성시마다 복사 상태 초기화
  useEffect(() => {
    if (!data) return;
    setCopied(false);
  }, [data]);

  // 초대코드로 링크 조립
  const inviteCode = data?.data?.data.code;
  const baseUrl = import.meta.env.VITE_FRONT_URL ?? "http://localhost:5173";
  const fullLink = inviteCode
    ? `${baseUrl}/invite/${type}/accept?code=${inviteCode}`
    : "";

  return (
    // 모달로 유도하는 버튼
    <Modal
      trigger={
        <Button variant="kakao" className={styles.invite_button}>
          <img src={kakao} />
          팀원 초대
        </Button>
      }
      title={`${name} 초대하기`}
    >
      {/* 조건부 렌더링 */}
      {data ? (
        <div className={styles.container}>
          <h3>초대 링크가 생성되었습니다 !</h3>

          <div className={styles.display}>
            <Input
              readOnly
              type="text"
              value={fullLink}
              className={styles.input}
            />
            <Button
              className={styles.copy_btn}
              onClick={() => {
                if (fullLink) {
                  setCopied(true);
                  navigator.clipboard.writeText(fullLink);
                }
              }}
            >
              {copied ? "복사됨!" : "복사"}
            </Button>
          </div>

          {/* 카톡 공유 */}
          <div className={styles.btn_container}>
            <Button
              className={styles.share_btn}
              variant="kakao"
              onClick={() => {
                if (!window.Kakao?.Link || !inviteCode) return;

                const templateId = type === "club" ? 121060 : 121500;
                const nameKey = type === "club" ? "clubName" : "teamName";
                // const nameValue = type === "club" ? "잔디밴드" : "구준표금잔디"; // 여기 props로 변경 예정

                window.Kakao.Link.sendCustom({
                  templateId,
                  templateArgs: {
                    [nameKey]: nameValue,
                    inviteCode, // ${inviteCode}
                  },
                });
              }}
            >
              카카오톡으로 공유
            </Button>
            <Button
              className={styles.new_btn}
              variant="secondary"
              onClick={() => mutate()}
            >
              새 링크 생성
            </Button>
          </div>

          <div className={styles.link_info}>
            <p>이 링크는 7일 후 만료됩니다</p>
            <p>친구들이 링크를 클릭하면 자동으로 {name}에 가입됩니다</p>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <h3>친구들을 {name}에 초대해보세요!</h3>
          <Button
            onClick={() => mutate()}
            className={styles.invite_btn}
            size="lg"
            variant="secondary"
          >
            초대 링크 생성하기
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default InviteModal;
