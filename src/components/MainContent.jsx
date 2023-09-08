import useGetLeaderboard from "../hooks/useGetLeaderboard";
import LeaderboardContent from "./LeaderboardContent";
import LeaderboardColumnNames from "./LeaderboardColumnNames";

const MainContent = () => {
	const { data, isLoading, isError, refetchLeaderboard } = useGetLeaderboard("world");

	// TODO: Button for toggling missing players on and off
	// Region select https://www.npmjs.com/package/react-dropdown
	// Top bar always stays on stop position sticky
	// Refresh, player search, season select, region select
	return (
		<div className="w-[768px]">
			<button onClick={() => refetchLeaderboard()}>Refetch</button>
			{/* Leaderboard */}
			<div className="bg-cswhitebright p-2">
				<LeaderboardColumnNames />
				<LeaderboardContent data={data} isLoading={isLoading} isError={isError} />
			</div>
		</div>
	);
};

export default MainContent;
