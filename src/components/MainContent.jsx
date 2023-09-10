import useGetLeaderboard from "../hooks/useGetLeaderboard";
import LeaderboardContent from "./LeaderboardContent";
import LeaderboardColumnNames from "./LeaderboardColumnNames";
import TopBar from "./TopBar/TopBar";

const MainContent = () => {
	const {
		data,
		isLoading,
		isError,
		refetchLeaderboard,
		fakeRefetch,
		isRefetching,
		isRefetchError,
	} = useGetLeaderboard("world");

	// TODO: Button for toggling missing players on and off
	// Region select https://www.npmjs.com/package/react-dropdown
	// Searching players shows all the players containing search phrase in a same kind of drop down like region, when clicked scroll to the player
	return (
		<div className="w-[768px]">
			<TopBar
				data={data}
				isLoading={isLoading}
				isError={isError}
				fakeRefetch={fakeRefetch}
				refetch={refetchLeaderboard}
				isRefetching={isRefetching}
				isRefetchError={isRefetchError}
			/>
			{/* Leaderboard */}
			<ul className="bg-cswhitebright p-2 min-h-[90dvh] shadow-scoreboard none">
				<LeaderboardColumnNames />
				<LeaderboardContent data={data} isLoading={isLoading} isError={isError} />
			</ul>
		</div>
	);
};

export default MainContent;
