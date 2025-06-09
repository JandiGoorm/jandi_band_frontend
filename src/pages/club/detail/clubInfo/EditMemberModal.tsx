import styles from "./EditMemberModal.module.css";
import Button from "@/components/button/Button";
import { useGetClubMembers } from "@/apis/club";
import { useParams } from "react-router-dom";
import type { ClubDetailResponse } from "@/types/club";

interface ModifyClubModalProps {
  club: ClubDetailResponse;
  onClose: () => void;
}

const EditMemberModal = ({ onClose }: ModifyClubModalProps) => {
  const { id } = useParams();

  const { data: membersData } = useGetClubMembers(id || "");

  console.log(membersData);

  if (!id) return <div>잘못된 접근입니다.</div>;

  return (
    <main>
      <p className={styles.title}>멤버 목록</p>
      <section className={styles.member_list_box}>
        {membersData?.data.members.map((member) => (
          <div className={styles.membber_box}>
            <p>
              {member.name} #{member.userId}
            </p>
          </div>
        ))}
      </section>
      <Button onClick={onClose}></Button>
    </main>
  );
};

export default EditMemberModal;
