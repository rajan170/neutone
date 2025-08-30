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
      <div className="text-black dark:text-white">
        <Image src="/logo.svg" alt="Neutone" width={size} height={size} priority />
      </div>
      {withWordmark && (
        <span
          className={[
            "font-black uppercase font-inter leading-none",
            "tracking-[0.22em]",
            "text-black dark:text-white",
            textSizeClass,
          ].join(" ")}
        >
          NEUTONE
        </span>
      )}
    </div>
  );
}

export default Logo;


