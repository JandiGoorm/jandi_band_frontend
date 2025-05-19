import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "버튼 크기",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "transparent", "none"],
      description: "버튼 스타일 변형",
    },
    children: {
      control: "text",
      description: "버튼 내용",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: "버튼",
  },
};

// Primary 버튼
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary 버튼",
  },
};

// Secondary 버튼
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary 버튼",
  },
};

//transparent 버튼
export const Transparent: Story = {
  args: {
    variant: "transparent",
    children: "Transparent 버튼",
  },
};

//none 버튼
export const None: Story = {
  args: {
    variant: "none",
    children: "None 버튼",
  },
};
