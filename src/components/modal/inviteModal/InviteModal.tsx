// 해당 컴포넌트는 동아리 초대 및 팀 초대를 지원하는 모달 컴포넌트 입니다.

import type { ApiResponse } from "@/apis/types";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { type AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import styles from "./InviteModal.module.css";
import kakao from "@/pages/vote/style/kakao.svg";

interface InviteModalProps {
  data: AxiosResponse<ApiResponse<{ link: string }>> | undefined;
  mutate: () => void;
  type: "club" | "team";
}

const InviteModal = ({ data, mutate, type }: InviteModalProps) => {
  const [copied, setCopied] = useState(false);

  const name = type === "club" ? "동아리" : "팀";

  useEffect(() => {
    if (!data) return;
    setCopied(false);
  }, [data]);

  return (
    <Modal
      trigger={
        <Button variant="kakao" className={styles.invite_button}>
          <img src={kakao} />
          팀원 초대
        </Button>
      }
      title={`${name} 초대하기`}
    >
      {data ? (
        <div className={styles.container}>
          <h3>초대 링크가 생성되었습니다 !</h3>

          <div className={styles.display}>
            <Input
              readOnly
              type="text"
              value={data?.data?.data.link}
              className={styles.input}
            />
            <Button
              className={styles.copy_btn}
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText(data?.data?.data.link);
              }}
            >
              {copied ? "복사됨!" : "복사"}
            </Button>
          </div>

          <div className={styles.btn_container}>
            <Button className={styles.share_btn} variant="kakao">
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
          <Button onClick={() => mutate()} className={styles.invite_btn}>
            초대 링크 생성하기
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default InviteModal;
