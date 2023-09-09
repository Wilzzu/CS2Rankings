import useGetLeaderboard from "../hooks/useGetLeaderboard";
import LeaderboardContent from "./LeaderboardContent";
import LeaderboardColumnNames from "./LeaderboardColumnNames";
import { useEffect } from "react";
import TopBar from "./TopBar/TopBar";

const MainContent = () => {
	const { data, isLoading, isError, refetchLeaderboard } = useGetLeaderboard("world");

	useEffect(() => {
		if (isError) console.log("error");
	}, [isError]);

	// TODO: Button for toggling missing players on and off
	// Region select https://www.npmjs.com/package/react-dropdown
	// Top bar always stays on stop position sticky
	// Refresh, player search, season select, region select
	// Searching players shows all the players containing search phrase in a same kind of drop down like region, when clicked scroll to the player
	return (
		<div className="w-[768px]">
			<div className="sticky top-4 mb-4 z-10">
				<TopBar refetch={refetchLeaderboard} />
			</div>
			{/* Leaderboard */}
			<ul className="bg-cswhitebright p-2 min-h-[90dvh] shadow-scoreboard none">
				<LeaderboardColumnNames />
				<LeaderboardContent data={data} isLoading={isLoading} isError={isError} />
			</ul>
		</div>
	);
};

export default MainContent;
