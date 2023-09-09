import { useEffect, useRef } from "react";
import "./App.css";
import usePrefetchLeaderboard from "./hooks/usePrefetchLeaderboard";
import MainContent from "./components/MainContent";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

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
		if (latest >= 1) return;
		ref.current.style.backgroundPositionX = latest * 4000 + "px";
	});

	return (
		<motion.div
			ref={ref}
			className="min-h-[100dvh] bg-[url('./assets/testbg.svg')] bg-fixed duration-500 ease-out ">
			<div className="flex justify-center">
				<MainContent />
			</div>
		</motion.div>
	);
}

export default App;
