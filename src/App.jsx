import { useEffect, useRef } from "react";
import "./App.css";
import usePrefetchLeaderboard from "./hooks/usePrefetchLeaderboard";
import MainContent from "./components/MainContent";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Header from "./components/Header";
import Credits from "./components/Credits";
import Footer from "./components/Footer";
let firstScroll = true;
// TODO: Show missing ranks as unknown/grayed out, since their name hasn't been approved yet

function App() {
	const { prefetchLeaderboard } = usePrefetchLeaderboard();
	useEffect(() => {
		prefetchLeaderboard();
	}, [prefetchLeaderboard]);

	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
	});

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (firstScroll) {
			firstScroll = false;
			return;
		}
		ref.current.style.backgroundPositionX = latest * 1000 + "px";
	});

	return (
		<div
			ref={ref}
			className="min-h-[100dvh] bg-[url('./assets/background.svg')] bg-repeat-x bg-cover bg-fixed duration-500 ease-out p-4 py-10">
			<Credits />
			<div className="flex justify-center mb-10">
				<Header />
			</div>
			<div className="flex justify-center mb-10">
				<MainContent />
			</div>
			<div className="flex justify-center">
				<Footer />
			</div>
		</div>
	);
}

export default App;
