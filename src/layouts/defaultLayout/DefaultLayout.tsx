import { useEffect } from "react";
import styles from "./DefaultLayout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import { useAuthStore } from "@/stores/authStore";
import { useGetMe } from "@/apis/auth";
import Loading from "@/components/loading/Loading";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { setUser } = useAuthStore();
  const { data: userData, isLoading } = useGetMe();

  useEffect(() => {
    if (!userData) return;
    setUser(userData.data);
  }, [setUser, userData]);

  if (isLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
