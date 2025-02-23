import React from "react";
import Switcher from "../Switcher/Switcher";
import { ILink } from "@/lib/definitions";

const ArticleLayout = ({
  children,
  links,
  theme,
  bg,
}: {
  children: React.ReactElement;
  links: ILink[];
  theme: "theme-1" | "theme-2";
  bg: "trans" | "white";
}) => {
  return (
    <>
      <Switcher bg={bg} links={links} theme={theme} />
      {children}
    </>
  );
};

export default ArticleLayout;
