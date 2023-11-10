import useGetLeaderboard from "../hooks/useGetLeaderboard";
import LeaderboardContent from "./LeaderboardContent";
import LeaderboardColumnNames from "./LeaderboardColumnNames";
import TopBar from "./TopBar/TopBar";
import { useState } from "react";
import { cn } from "../../lib/utils";

const MainContent = (props) => {
	const [focusId, setFocusId] = useState(null);
	const [selectedRegion, setSelectedRegion] = useState("World");
	const [selectedSeason, setSelectedSeason] = useState("Season 1");
	const [showClickInfo, setShowClickInfo] = useState(true);

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
				<div
					className={cn(
						"w-full max-w-[768px] bg-cswhitebright dark:bg-darkcswhitebright",
						props.lightweight
							? "h-[69dvh] overflow-y-scroll pt-0 pb-1 scrollbar-thin scrollbar-thumb-csbrightblue scrollbar-track-cswhite dark:scrollbar-thumb-csorange dark:scrollbar-track-csgraydarkest"
							: "shadow-scoreboard min-h-[90dvh] py-2"
					)}>
					<LeaderboardColumnNames
						lightweight={props.lightweight}
						isBetaSeason={selectedSeason === "Beta Season"}
						selectedRegion={selectedRegion}
						showClickInfo={showClickInfo}
					/>
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
						selectedSeason={selectedSeason}
						lightweight={props.lightweight}
						showClickInfo={showClickInfo}
						setShowClickInfo={setShowClickInfo}
					/>
				</div>
			</div>
		</div>
	);
};

export default MainContent;
