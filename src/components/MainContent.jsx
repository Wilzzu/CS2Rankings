import useGetLeaderboard from "../hooks/useGetLeaderboard";
import LeaderboardContent from "./LeaderboardContent";
import LeaderboardColumnNames from "./LeaderboardColumnNames";
import TopBar from "./TopBar/TopBar";
import { useState } from "react";

const MainContent = () => {
	const [focusId, setFocusId] = useState(null);
	const [selectedRegion, setSelectedRegion] = useState("World");

	const {
		cachedData,
		isLoading,
		isError,
		refetchLeaderboard,
		isRefetching,
		isRefetchError,
		fakeRefetch,
	} = useGetLeaderboard(selectedRegion);

	// TODO: Button for toggling missing players on and off
	// Region select https://www.npmjs.com/package/react-dropdown
	// Searching players shows all the players containing search phrase in a same kind of drop down like region, when clicked scroll to the player
	return (
		<div className="w-[768px]">
			<TopBar
				data={cachedData}
				isLoading={isLoading}
				isError={isError}
				refetch={refetchLeaderboard}
				isRefetching={isRefetching}
				isRefetchError={isRefetchError}
				fakeRefetch={fakeRefetch}
				setFocusId={setFocusId}
				selectedRegion={selectedRegion}
				setSelectedRegion={setSelectedRegion}
			/>
			{/* Leaderboard */}
			<ul className="bg-cswhitebright p-2 min-h-[90dvh] shadow-scoreboard none">
				<LeaderboardColumnNames />
				<LeaderboardContent
					data={cachedData}
					isLoading={isLoading}
					isError={isError}
					focusId={focusId}
					fakeRefetch={fakeRefetch}
					isRefetching={isRefetching}
					isRefetchError={isRefetchError}
				/>
			</ul>
		</div>
	);
};

export default MainContent;
