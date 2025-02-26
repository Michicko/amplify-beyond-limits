import React from "react";
import styles from "../Layout.module.css";
import clsx from "clsx";

function LayoutHeader({ children }: { children: React.ReactElement }) {
	return <div className={clsx(styles["layout__header"])}>{children}</div>;
}

export default LayoutHeader;
