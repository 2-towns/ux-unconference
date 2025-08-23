"use client";
import { useEffect } from "react";
import { init } from "lib/cyberpunk-scene";

export function CyberpunkScene() {
  useEffect(() => {
    init();
  }, []);

  return <div id="cyberpunk" className="cyberpunk"></div>;
}