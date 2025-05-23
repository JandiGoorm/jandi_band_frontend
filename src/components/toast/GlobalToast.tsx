import * as Toast from "@radix-ui/react-toast";
import { useToastStore } from "@/stores/toastStore";
import styles from "./GlobalToast.module.css";

const GlobalToast = () => {
  const { open, status, message, hideToast } = useToastStore();

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={hideToast}
        className={styles.container}
      >
        <Toast.Title>{status}</Toast.Title>
        <Toast.Description>{message}</Toast.Description>
      </Toast.Root>

      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default GlobalToast;
