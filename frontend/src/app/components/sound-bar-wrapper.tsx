"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SoundBar = dynamic(() => import("./sound-bar"), {
  ssr: false,
});

export default function SoundBarWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <SoundBar />;
}
