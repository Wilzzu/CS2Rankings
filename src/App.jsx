import { useEffect, useRef } from "react";
import "./App.css";
import usePrefetchLeaderboard from "./hooks/usePrefetchLeaderboard";
import MainContent from "./components/MainContent";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Header from "./components/Header";
import Credits from "./components/Credits";
import Footer from "./components/Footer";
let firstScroll = true;

const preloadImgs = [
	"/assets/ranks/rank.png",
	"/assets/ranks/rankdown.png",
	"/assets/ranks/rankup.png",
	"/assets/ranks/rankGold.png",
	"/assets/ranks/rankdownGold.png",
	"/assets/ranks/rankupGold.png",
];

function App() {
	const { prefetchLeaderboard } = usePrefetchLeaderboard();
	useEffect(() => {
		prefetchLeaderboard();
	}, [prefetchLeaderboard]);

	// Change background position on scroll
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
	});
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (firstScroll) {
			firstScroll = false;
			return;
		}
		ref.current.style.backgroundPositionX = Math.floor(latest * 1000) + "px";
	});
	// Preload images
	useEffect(() => {
		preloadImgs.forEach((image) => {
			const newImage = new Image();
			newImage.src = image;
			window[image] = newImage;
		});
	}, []);

	return (
		<div
			ref={ref}
			className="min-h-[100dvh] bg-[url('./assets/background.svg')] bg-repeat-x bg-cover bg-fixed duration-500 ease-out md:px-4 py-10">
			<Credits />
			<div className="flex justify-center mb-4 px-1 md:px-0">
				<Header />
			</div>
			<div className="flex justify-center mb-10">
				<MainContent />
			</div>
			<div className="flex justify-center px-1 md:px-0">
				<Footer />
			</div>
		</div>
	);
}

export default App;
