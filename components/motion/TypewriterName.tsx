"use client";

import { useEffect, useState } from "react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

const NAME = "Luis Gómez";
const KEYSTROKE_DELAYS = [112, 86, 124, 74, 138, 92, 118, 78, 106, 84];

export function TypewriterName() {
  const prefersReducedMotion = useHydratedReducedMotion();
  const [text, setText] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let index = 0;
    let keystroke = 0;
    let start = 0;

    const typeNextCharacter = () => {
      index += 1;
      setText(NAME.slice(0, index));

      if (index < NAME.length) {
        keystroke = window.setTimeout(
          typeNextCharacter,
          KEYSTROKE_DELAYS[index % KEYSTROKE_DELAYS.length],
        );
      } else {
        setComplete(true);
      }
    };

    const playTyping = () => {
      window.clearTimeout(start);
      window.clearTimeout(keystroke);
      index = 0;
      setText("");
      setComplete(false);
      start = window.setTimeout(typeNextCharacter, 320);
    };

    const onHashChange = () => {
      if (window.location.hash === "#hero" || window.location.hash === "") playTyping();
    };

    playTyping();
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.clearTimeout(start);
      window.clearTimeout(keystroke);
    };
  }, [prefersReducedMotion]);

  const renderedText = prefersReducedMotion ? NAME : text;
  const renderedComplete = Boolean(prefersReducedMotion || complete);

  return (
    <span className="typing-name" data-complete={renderedComplete} aria-label={NAME}>
      <span className="typing-ghost" aria-hidden="true">{NAME}</span>
      <span className="typing-live" aria-hidden="true">
        {renderedText}
        <span className="typing-cursor" />
      </span>
    </span>
  );
}
