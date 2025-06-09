import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./Dropdown.module.css";
import clsx from "clsx";

type DropdownSize = "sm" | "md";

interface DropdownItem {
  label: string;
  onSelect: () => void;
}

interface DropdownProps {
  size?: DropdownSize;
  trigger: React.ReactNode;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ size = "md", trigger, items }) => {
  const sizeClass = styles[`dropdown_${size}`];
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>{trigger}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.dropdown_content}
          side="bottom"
          sideOffset={3}
        >
          {items.map((item, idx) => (
            <DropdownMenu.Item
              key={idx}
              onSelect={item.onSelect}
              className={clsx(styles.dropdown_item, sizeClass)}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className={styles.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
