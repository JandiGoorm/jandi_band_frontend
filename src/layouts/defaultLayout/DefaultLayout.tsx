import styles from "./DefaultLayout.module.css";
import Footer from "./Footer";
import Header from "./Header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
