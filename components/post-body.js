import markdownStyles from "./markdown-styles.module.css";
import { PortableText } from "@portabletext/react";

export default function PostBody({ content }) {
  return (
    <div
      className={`max-w-prose mx-auto prose lg:prose-lg ${markdownStyles.markdown}`}
    >
      <PortableText value={content} />
    </div>
  );
}
