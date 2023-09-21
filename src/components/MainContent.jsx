import useGetLeaderboard from "../hooks/useGetLeaderboard";
import LeaderboardContent from "./LeaderboardContent";
import LeaderboardColumnNames from "./LeaderboardColumnNames";
import TopBar from "./TopBar/TopBar";
import { useState } from "react";

const MainContent = () => {
	const [focusId, setFocusId] = useState(null);
	const [selectedRegion, setSelectedRegion] = useState("World");
	const [selectedSeason, setSelectedSeason] = useState("Beta Season");

	const {
		cachedData,
		isLoading,
		isError,
		refetchLeaderboard,
		isRefetching,
		isRefetchError,
		fakeRefetch,
	} = useGetLeaderboard(selectedSeason, selectedRegion);

	return (
		<div className="w-full flex flex-col items-center">
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
				selectedSeason={selectedSeason}
				setSelectedSeason={setSelectedSeason}
			/>
			{/* Leaderboard */}
			<div className="w-full px-2 md:px-0 flex justify-center">
				<ul className="w-full max-w-[768px] bg-cswhitebright py-2 min-h-[90dvh] shadow-scoreboard">
					<LeaderboardColumnNames />
					<LeaderboardContent
						data={cachedData}
						isLoading={isLoading}
						isError={isError}
						setFocusId={setFocusId}
						focusId={focusId}
						fakeRefetch={fakeRefetch}
						isRefetching={isRefetching}
						isRefetchError={isRefetchError}
						selectedRegion={selectedRegion}
					/>
				</ul>
			</div>
		</div>
	);
};

export default MainContent;
