import React from "react";
import { cn } from "../../lib/utils"; // 유틸리티 함수 (클래스 병합용)

// Input 컴포넌트 Props 정의
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string; // 추가 스타일을 위한 클래스
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          `
            flex w-full rounded-md border border-input px-3 py-2 text-sm 
            ring-offset-background file:border-0 file:bg-transparent file:text-sm 
            file:font-medium file:text-foreground placeholder:text-muted-foreground 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
            focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
            bg-white/90 h-12 text-black pl-4 pr-12
          `,
          className // 추가 클래스 병합
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
