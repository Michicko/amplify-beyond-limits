import React, { useCallback, useEffect, useState } from "react";

function useGetScreenWidth() {
	const [screenWidth, setScreenWidth] = useState<number | null>(null);

	const checkScreenSize = useCallback(() => {
		if (window) {
			setScreenWidth(window.innerWidth);
		}
	}, []);

	useEffect(() => {
		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	return { screenWidth };
}

export default useGetScreenWidth;
