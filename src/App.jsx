import { useEffect, useRef } from "react";
import "./App.css";
// import usePrefetchLeaderboard from "./hooks/usePrefetchLeaderboard";
import MainContent from "./components/MainContent";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Header from "./components/Header";
import Credits from "./components/Credits";
import Footer from "./components/Footer";
import GdprPopup from "./components/GdprPopup";
import { useSelector } from "react-redux";
import { cn } from "../lib/utils";
let firstScroll = true;
import { renderToStaticMarkup } from "react-dom/server";
import Background from "./assets/Background.jsx";
import useCookieHandler from "./hooks/useCookieHandler";

const preloadImgs = [
	"/assets/ranks/blur/rank.png",
	"/assets/ranks/blur/rankdown.png",
	"/assets/ranks/blur/rankup.png",
	"/assets/ranks/blur/rankGold.png",
	"/assets/ranks/blur/rankdownGold.png",
	"/assets/ranks/blur/rankupGold.png",
	"/assets/ranks/rank.webp",
	"/assets/ranks/rankdown.webp",
	"/assets/ranks/rankup.webp",
	"/assets/ranks/rankGold.webp",
	"/assets/ranks/rankdownGold.webp",
	"/assets/ranks/rankupGold.webp",
];

function App() {
	// const { prefetchLeaderboard } = usePrefetchLeaderboard();
	// useEffect(() => {
	// 	prefetchLeaderboard();
	// }, [prefetchLeaderboard]);

	const lightweight = useSelector((state) => state.lightweight);
	const darkmode = useSelector((state) => state.darkmode);
	useCookieHandler();

	// Change background position on scroll
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
	});
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (lightweight) return;
		if (firstScroll) {
			firstScroll = false;
			return;
		}
		ref.current.style.backgroundPositionX = Math.floor(latest * 1000) + "px";
	});
	// Preload images
	useEffect(() => {
		if (lightweight) return;
		preloadImgs.forEach((image) => {
			const newImage = new Image();
			newImage.src = image;
			window[image] = newImage;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;

		if (darkmode) root.classList.add("dark");
		else root.classList.remove("dark");
	}, [darkmode]);

	return (
		<div
			ref={ref}
			style={{
				backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
					renderToStaticMarkup(<Background dark={darkmode} />)
				)}")`,
			}}
			className={cn(
				"min-h-[100dvh] bg-repeat-x bg-cover bg-fixed duration-500 ease-out md:px-4",
				lightweight ? "py-2" : "py-10"
			)}>
			<GdprPopup />
			<Credits />
			<div className="flex justify-center my-5 px-1 md:px-0">
				<Header darkmode={darkmode} />
			</div>
			<div className={cn("flex justify-center", lightweight ? "mb-2" : "mb-10")}>
				<MainContent lightweight={lightweight} />
			</div>
			<div className="flex justify-center px-1 md:px-0">
				<Footer />
			</div>
		</div>
	);
}

export default App;
