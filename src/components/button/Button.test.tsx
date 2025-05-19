import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./Button";

describe("Button 컴포넌트", () => {
  it("버튼이 올바르게 렌더링되어야 함", () => {
    render(<Button>테스트 버튼</Button>);
    const buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement).toBeInTheDocument();
  });

  it("기본 스타일이 primary여야 함", () => {
    render(<Button>테스트 버튼</Button>);
    const buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement.className).toContain("btn_primary");
  });

  it("secondary 스타일이 적용되어야 함", () => {
    render(<Button variant="secondary">테스트 버튼</Button>);
    const buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement.className).toContain("btn_secondary");
  });
  it("transparent 스타일이 적용되어야 함", () => {
    render(<Button variant="transparent">테스트 버튼</Button>);
    const buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement.className).toContain("btn_transparent");
  });
  it("none 스타일이 적용되어야 함", () => {
    render(<Button variant="none">테스트 버튼</Button>);
    const buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement.className).toContain("btn_none");
  });

  it("size 속성에 따라 크기 클래스가 적용되어야 함", () => {
    render(<Button size="sm">작은 버튼</Button>);
    const buttonElement = screen.getByText("작은 버튼");
    expect(buttonElement.className).toContain("btn_sm");
  });
  it("size 속성에 따라 크기 클래스가 적용되어야 함", () => {
    render(<Button size="lg">큰 버튼</Button>);
    const buttonElement = screen.getByText("큰 버튼");
    expect(buttonElement.className).toContain("btn_lg");
  });

  it("추가 className이 적용되어야 함", () => {
    render(<Button className="custom-class">테스트 버튼</Button>);
    const buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement.className).toContain("custom-class");
  });
});
