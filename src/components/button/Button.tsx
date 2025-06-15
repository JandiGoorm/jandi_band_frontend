import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "transparent" | "none" | "kakao";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  className?: string;
  variant?: ButtonVariant;
  isClicked?: boolean;
}

const Button = ({
  size = "md",
  variant = "primary",
  children,
  className,
  isClicked = false,
  ...props
}: ButtonProps) => {
  const sizeClass = styles[`btn_${size}`];
  const variantClass = styles[`btn_${variant}`];
  const clickedClass =
    variant === "transparent" && isClicked
      ? styles.btn_transparent_clicked
      : "";

  return (
    <button
      className={clsx(
        sizeClass,
        variantClass,
        clickedClass,
        className,
        styles.btn
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
