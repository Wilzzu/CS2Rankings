import { useEffect } from "react";
import "./App.css";
import usePrefetchLeaderboard from "./hooks/usePrefetchLeaderboard";
import MainContent from "./components/MainContent";

// TODO: Show missing ranks as unknown/grayed out, since their name hasn't been approved yet

function App() {
	const { prefetchLeaderboard } = usePrefetchLeaderboard();
	useEffect(() => {
		prefetchLeaderboard();
	}, [prefetchLeaderboard]);

	return (
		<div className="bg-cswhite min-h-[100dvh]">
			<div className="flex justify-center">
				<MainContent />
			</div>
		</div>
	);
}

export default App;
