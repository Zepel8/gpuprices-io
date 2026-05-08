import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: (props) => <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined} />,
};
