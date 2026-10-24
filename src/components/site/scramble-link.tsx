"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

export function ScrambleLink({ text, href }: { text: string; href: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lenis = useLenis();

  const startScramble = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
      iteration += 1 / 2;
    }, 28);
  }, [text]);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target || !lenis) return;

    event.preventDefault();
    lenis.scrollTo(target, {
      duration: 1.2,
      easing: (value) => 1 - Math.pow(1 - value, 4),
      onComplete: () => {
        window.history.replaceState(null, "", href);
      },
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={startScramble}
      onClick={handleClick}
      className="font-bold text-[24px] leading-[24px] tracking-[-0.5px] text-[#F6F6F6] text-right transition-colors duration-150 hover:text-white inline-block select-none"
    >
      {displayText}
    </a>
  );
}
