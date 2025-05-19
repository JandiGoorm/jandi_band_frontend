import styles from "./Input.module.css";
import React, { forwardRef } from "react";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  placeholder?: string;
  type?: string;
  isDarkMode?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder = "",
      type = "text",
      isDarkMode = true,
      inputSize = "lg",
      ...props
    },
    ref
  ) => {
    const sizeClass = styles[`input_${inputSize}`];

    return (
      <input
        ref={ref}
        className={`${sizeClass} ${styles.input} ${isDarkMode ? styles.dark : ""}`}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
