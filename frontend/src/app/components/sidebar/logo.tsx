"use client";

import Image from "next/image";
import React from "react";

type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

export function Logo({ size = 28, withWordmark = true, className }: LogoProps) {
  const textSizeClass =
    size >= 40 ? "text-3xl" : size >= 32 ? "text-2xl" : size >= 28 ? "text-xl" : "text-lg";

  return (
    <div
      className={["flex items-center gap-2", className].filter(Boolean).join(" ")}
      aria-label="Neutone logo"
      title="Neutone"
    > 
      <Image src="/logo.svg" alt="Neutone" width={size} height={size} priority />
      {withWordmark && (
        <span
          className={[
            "font-black uppercase font-inter leading-none",
            "tracking-[0.22em]",
            "drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]",
            textSizeClass,
          ].join(" ")}
        >
          <span className="inline-block bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300 bg-clip-text text-transparent">NEU</span>
          <span className="inline-block bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 bg-clip-text text-transparent">TONE</span>
        </span>
      )}
    </div>
  );
}

export default Logo;


