"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import PixelInputField from "@/assets/images/signuporgo/pixel_inputfield.svg";

interface PixelInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  type?: "text" | "password";
  inputMode?: "text" | "numeric";
  pattern?: string;
  autoComplete?: string;
  cursorScaleX?: string;
  cursorScaleY?: string;
}

export function PixelInput({
  value,
  onChange,
  maxLength,
  type = "text",
  inputMode = "text",
  pattern,
  autoComplete,
  cursorScaleX = "2.2",
  cursorScaleY = "180",
}: PixelInputProps) {
  const [cursorPos, setCursorPos] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setCursorPos(e.target.selectionStart || e.target.value.length);
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCursorPos(target.selectionStart || 0);
  };

  // 비밀번호일 때 마스킹 처리
  const displayValue = type === "password" ? "*".repeat(value.length) : value;
  const displayChar = type === "password" ? "*" : value[cursorPos];

  return (
    <div className="relative w-[200px] h-[48px]">
      <Image
        src={PixelInputField}
        alt="input field"
        fill
        className="object-contain"
      />
      {/* 커스텀 커서 표시 - 리눅스 스타일 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <span className="text-black font-extrabold text-xl">
          {type === "password"
            ? "*".repeat(cursorPos)
            : value.slice(0, cursorPos)}
        </span>
        {isFocused && (
          <span className="relative inline-block">
            <span
              className="text-black font-extrabold text-xl animate-blink absolute -bottom-1 left-1/2"
              style={{
                transform: `translateX(-40%) scaleX(${cursorScaleX}) scaleY(${parseFloat(cursorScaleY) / 100})`,
              }}
            >
              _
            </span>
            <span className="text-black font-extrabold text-xl">
              {cursorPos < value.length ? displayChar : "\u00A0"}
            </span>
          </span>
        )}
        {isFocused ? (
          <span className="text-black font-extrabold text-xl">
            {type === "password"
              ? "*".repeat(Math.max(0, value.length - cursorPos - 1))
              : value.slice(cursorPos + 1)}
          </span>
        ) : (
          <span className="text-black font-extrabold text-xl">
            {type === "password"
              ? "*".repeat(value.length - cursorPos)
              : value.slice(cursorPos)}
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=""
        maxLength={maxLength}
        inputMode={inputMode}
        pattern={pattern}
        autoComplete={autoComplete}
        className="absolute inset-0 w-full h-full bg-transparent px-4 text-center text-transparent caret-transparent font-extrabold focus:outline-none"
      />
    </div>
  );
}
