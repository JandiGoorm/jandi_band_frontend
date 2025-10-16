import styles from "./EditMemberModal.module.css";
import { useGetClubMembers } from "@/apis/club";
import { useParams } from "react-router-dom";
import type { Member } from "@/types/club";
import { useState } from "react";
import clsx from "clsx";
import EditMemberButton from "./EditMemberButton";

const EditMemberModal = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState<Member | null>();
  const { data: membersData } = useGetClubMembers(id || "");

  // console.log(membersData);

  if (!id) return <div>잘못된 접근입니다.</div>;

  const handleSelect = (member: Member) => {
    setSelected(member);
  };

  return (
    <main className={styles.container}>
      <p className={styles.guide}>
        멤버를 선택하여 관리하세요! 한번에 한명씩만 관리 가능합니다!
      </p>
      <p className={styles.title}>멤버 목록</p>
      <section className={styles.member_list_box}>
        {membersData?.data.members.map((member) => (
          <div
            key={member.userId}
            className={clsx(styles.member_box, {
              [styles.selected]: selected?.userId === member.userId,
            })}
            onClick={() => handleSelect(member)}
          >
            <p>{member.name}</p>
            <p className={styles.member_sub}>#{member.userId}</p>
          </div>
        ))}
      </section>

      <EditMemberButton
        clubId={id}
        userId={selected?.userId || null}
        onSuccess={() => setSelected(null)}
      />
    </main>
  );
};

export default EditMemberModal;
