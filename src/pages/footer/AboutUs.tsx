import styles from "./AboutUs.module.css";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";

const frontendMembers = [
  {
    name: "윤승휘",
    role: "Frontend Developer",
    github: "https://github.com/Yoonhwi",
  },
  {
    name: "전민근",
    role: "Frontend Developer",
    github: "https://github.com/Jun-min-geun",
  },
  {
    name: "강세진",
    role: "Frontend Developer",
    github: "https://github.com/S2ej1n",
  },
];

const backendMembers = [
  {
    name: "김연재",
    role: "Backend Developer",
    github: "https://github.com/kyj0503",
  },
  {
    name: "한정희",
    role: "Backend Developer",
    github: "https://github.com/hhhan-jh",
  },
  {
    name: "김건영",
    role: "Backend Developer",
    github: "https://github.com/diamondgonny",
  },
  {
    name: "강진주",
    role: "Backend Developer",
    github: "https://github.com/rkdwlswn",
  },
];

const AboutUs = () => {
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.subtitle}>Rhythmeet 개발 팀을 소개합니다 🎧</p>

        <section className={styles.group}>
          <h2>🎨 Frontend</h2>
          <p className={styles.subscript}>
            사용자에게 가장 먼저 닿는 경험을 디자인합니다.
          </p>
          <div className={styles.grid}>
            {frontendMembers.map((member) => (
              <div key={member.name} className={styles.card}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.group}>
          <h2>🛠 Backend</h2>
          <p className={styles.subscript}>
            안정적인 기능 위에, 당신의 연습을 올려두세요.
          </p>
          <div className={styles.grid}>
            {backendMembers.map((member) => (
              <div key={member.name} className={styles.card}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default AboutUs;
