import { Fragment } from "react";
import type { RichText as RichTextContent } from "@/types/content";

export function RichText({ content }: { content: RichTextContent }) {
  return content.map((part, index) => {
    if (typeof part === "string") return <Fragment key={index}>{part}</Fragment>;
    switch (part.tone) {
      case "strong":
        return <strong key={index}>{part.text}</strong>;
      case "code":
        return <em key={index}>{part.text}</em>;
      case "ai":
        return <span key={index} className="statement-ai">{part.text}</span>;
      case "security":
        return <span key={index} className="statement-security">{part.text}</span>;
    }
  });
}
