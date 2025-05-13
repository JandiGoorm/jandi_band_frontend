import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonSize = "md" | "lg";
type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  className?: string;
  variant?: ButtonVariant;
}

const Button = ({
  size = "md",
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  const sizeClass = styles[`btn_${size}`];
  const variantClass = styles[`btn_${variant}`];

  return (
    <button
      className={clsx(sizeClass, variantClass, className, styles.btn)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
