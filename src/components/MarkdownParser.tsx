import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface Props {
  text: string;
}

function MarkdownParser({ text }: Props) {
  // Convert Markdown text to sanitized HTML
  const getMarkdownText = () => {
    const rawMarkup: any = marked(text);  // Convert Markdown to HTML
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);  // Sanitize the HTML
    return { __html: sanitizedMarkup };
  };

  return <div dangerouslySetInnerHTML={getMarkdownText()} />;
}

export default MarkdownParser;
