"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  /** 크기 옵션: fixed(144x32), small(105x32), auto */
  size?: "fixed" | "small" | "auto";
  className?: string;
}

/**
 * 공통 배지 컴포넌트
 * - 메시지 획득 배지, 마스터 배지, 보유 현황 배지 등에 사용
 */
export function Badge({
  children,
  icon,
  size = "auto",
  className = ""
}: BadgeProps) {
  const sizeClasses = {
    fixed: "w-[154px] h-[32px] justify-center",
    small: "w-[105px] h-[32px] justify-center",
    auto: "px-3 py-2 w-fit",
  };
  const sizeClass = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2 bg-black/50 rounded-[8px] ${sizeClass} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="text-white text-[12px] font-extrabold">
        {children}
      </span>
    </div>
  );
}
