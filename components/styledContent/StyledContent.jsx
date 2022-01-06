import React, { useEffect } from "react";
import Markdown from "markdown-to-jsx";
import ReactDOMServer from "react-dom/server";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function StyledContent(props) {
  // highlight code
  useEffect(() => {
    const preElements = document.querySelectorAll("pre");

    [...preElements].forEach((ele) => {
      const elementHighlight = ReactDOMServer.renderToStaticMarkup(
        <SyntaxHighlighter
          wrapLongLines={true}
          language="javascript"
          style={darcula}
        >
          {ele.textContent}
        </SyntaxHighlighter>
      );

      ele.outerHTML = elementHighlight;
    });
  }, []);
  return (
    <div className="content">
      <Markdown>{props.children}</Markdown>
    </div>
  );
}
