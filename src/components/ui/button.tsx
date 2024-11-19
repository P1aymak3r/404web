import React from "react";
import { cn } from "../../lib/utils"; // 유틸리티 함수 (클래스 병합용)
import { LucideIcon } from "lucide-react"; // 아이콘 타입

// Button 컴포넌트의 Props 정의
interface ButtonProps {
  onClick?: () => void; // 클릭 이벤트 핸들러
  children?: React.ReactNode; // 버튼 내부 내용
  disabled?: boolean; // 버튼 비활성화 여부
  icon?: LucideIcon; // 아이콘 컴포넌트 (선택 사항)
  className?: string; // 추가 클래스 (선택 사항)
  size?: "small" | "medium" | "large" | "icon"; // size 속성 추가
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  icon: Icon,
  className,
  size = "medium", // 기본값 설정
}) => {
  // size에 따라 적용할 클래스 정의
  const sizeClasses: { [key: string]: string } = {
    small: "h-8 w-8 text-sm",
    medium: "h-10 w-10 text-md",
    large: "h-12 w-12 text-lg",
    icon: "h-10 w-10", // icon size에 맞게 조절
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `
          inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md 
          text-sm font-medium ring-offset-background transition-colors 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
          [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
          bg-primary text-primary-foreground hover:bg-primary/90 
          relative
        `,
        sizeClasses[size], // size에 따른 클래스 적용
        className // 추가 클래스 적용
      )}
    >
      {Icon && <Icon className="h-4 w-4" />} {/* 아이콘이 있으면 렌더링 */}
      {children}
    </button>
  );
};

export default Button;
